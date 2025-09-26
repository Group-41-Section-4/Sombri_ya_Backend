"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("../../app.module");
const initial_seed_1 = require("./initial-seed");
async function bootstrap() {
    const app = await core_1.NestFactory.createApplicationContext(app_module_1.AppModule);
    const seeder = app.get(initial_seed_1.InitialSeed);
    try {
        console.log('Seeding database...');
        await seeder.run();
        console.log('Seeding complete!');
    }
    catch (error) {
        console.error('Seeding failed!', error);
    }
    finally {
        await app.close();
    }
}
bootstrap();
//# sourceMappingURL=run-seed.js.map