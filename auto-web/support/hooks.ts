import { After, AfterAll, AfterStep, Before } from "@cucumber/cucumber";
import { chromium } from "@playwright/test";
import { AlignmentType, Document, HeadingLevel, ImageRun, Packer, Paragraph, TextRun } from "docx";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";
import { CustomWorld } from "./world";

const scenarioReports: Array<{
  name: string;
  steps: CustomWorld["stepScreenshots"];
}> = [];

Before(async function (this: CustomWorld, { pickle }) {

  console.log("Ejecutando Before Hook");
  this.scenarioName = pickle.name;
  this.stepScreenshots = [];

  this.browser = await chromium.launch({
    channel: "chrome",     // Usa Google Chrome
    headless: false,       // Muestra el navegador
    slowMo: 500            // Ejecuta paso a paso
  });

  this.context = await this.browser.newContext();

  this.page = await this.context.newPage();

  console.log(this.page);

});

AfterStep(async function (this: CustomWorld, { pickleStep, result }) {
  const status = result?.status ?? "UNKNOWN";
  let screenshot: Buffer | undefined;

  if (status !== "SKIPPED" && this.page && !this.page.isClosed()) {
    try {
      screenshot = await this.page.screenshot();
    } catch {
      screenshot = undefined;
    }
  }

  this.stepScreenshots.push({
    text: pickleStep.text,
    status,
    screenshot
  });
});

After(async function (this: CustomWorld) {
  scenarioReports.push({
    name: this.scenarioName,
    steps: this.stepScreenshots
  });

  await this.browser.close();

});

AfterAll(async function () {
  if (scenarioReports.length === 0) return;

  const children: Paragraph[] = [
    new Paragraph({ text: "Reporte de automatización", heading: HeadingLevel.TITLE }),
    new Paragraph(`Generado: ${new Date().toLocaleString("es-ES")}`)
  ];

  for (const scenario of scenarioReports) {
    children.push(new Paragraph({ text: scenario.name, heading: HeadingLevel.HEADING_1 }));

    scenario.steps.forEach((step, index) => {
      children.push(new Paragraph({
        children: [new TextRun({ text: `${index + 1}. ${step.text}`, bold: true })]
      }));
      children.push(new Paragraph(`Resultado: ${step.status}`));

      if (step.screenshot) {
        children.push(new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [new ImageRun({
            data: step.screenshot,
            type: "png",
            transformation: { width: 600, height: 338 }
          })]
        }));
      }
    });
  }

  const document = new Document({ sections: [{ children }] });
  const reportsDirectory = path.join(process.cwd(), "reports");
  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const reportPath = path.join(reportsDirectory, `reporte-${timestamp}.docx`);

  await mkdir(reportsDirectory, { recursive: true });
  await writeFile(reportPath, await Packer.toBuffer(document));
  console.log(`Reporte Word generado: ${reportPath}`);
});