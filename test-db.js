import { getDashboardStats } from './src/lib/services/dashboard.service.js';
async function test() {
  try {
    const data = await getDashboardStats('0x1234567890123456789012345678901234567890');
    console.log(data);
  } catch (err) {
    console.error(err);
  }
  process.exit(0);
}
test();
