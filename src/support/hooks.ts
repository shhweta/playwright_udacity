import { Before, After, BeforeAll, setDefaultTimeout } from '@cucumber/cucumber';
import { World } from './world';

// Set default timeout for all steps
setDefaultTimeout(2000);

Before(async function(this: World) {
    let retries = 3;
    while (retries > 0) {
        try {
            await this.init();
            break;
        } catch (error) {
            retries--;
            if (retries === 0) throw error;
            console.log(`Retrying browser initialization. Attempts left: ${retries}`);
            await new Promise(resolve => setTimeout(resolve, 1000));
        }
    }
});

After(async function(this: World) {
    try {
        await this.cleanup();
    } catch (error) {
        console.error('Error in cleanup:', error);
    }
}); 