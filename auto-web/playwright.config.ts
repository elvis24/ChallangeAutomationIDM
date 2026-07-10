import { defineConfig } from "@playwright/test";

export default defineConfig({

    use:{

        browserName:"chromium",

        channel:"chrome",

        headless:false,

        launchOptions:{

            slowMo:800

        }

    }

});