
const puppeteer = require("puppeteer");

const url =
  "https://www.instagram.com/?hl=pt-br";

const [USERNAME, PASSWORD] = ["YourUsername", "YourPass"];

const proxies = [
  "194.67.37.90:3128",
  "41.215.74.234:53028",
  "50.7.87.220:38082",
  "91.230.199.174:54990",
  "103.111.56.60:53281",
  "94.43.142.190:58365"
];

const randProxy = () =>
  proxies[Math.floor(Math.random() * (proxies.length - 1))];

const autoScroll = page =>
  page.evaluate(
    async () =>
      await new Promise((resolve, reject) => {
        let totalHeight = 0;
        let distance = 100;
        let timer = setInterval(() => {
          let scrollHeight = document.body.scrollHeight;
          window.scrollBy(0, distance);
          totalHeight += distance;
          if (totalHeight >= scrollHeight) {
            clearInterval(timer);
            resolve();
          }
        }, 300);
      })
  );

(async () => {
  const browser = await puppeteer.launch({
    args: [`--proxy-server=http=${randProxy}`, "--incognito"],
    headless: false
  });
  const page = await browser.newPage();
  await page.goto(url, { waitUntil: "networkidle2" });
  await page.setViewport({ width: 1200, height: 800 });
  //await autoScroll(page);
  await page.type('input[name=username]', `${USERNAME}`);
  await page.type('input[name=password]', `${PASSWORD}`);
  await page.click('article > .rgFsT > .gr27e > .EPjEi > .HmktE > .Igw0E > button');
  await page.waitForNavigation();
  await page.click('.RnEpo > .pbNvD > .piCib > .mt3GC > .HoLwm');
  await page.waitFor(2000)
  await page.click('._1SP8R > .COOzN > ._22l1 > .Igw0E > a > div');
  await page.waitForNavigation();
  await page.screenshot({path: `print.png`});

  await browser.close();
})();