const puppeteer = require("puppeteer");
const expect = require("chai").expect;

describe("Test Log In page", () => {
  let page;
  let browser;
  // this.timeout(30000);

  before(async () => {
    browser = await puppeteer.launch({
      headless: false,
    });
    page = await browser.newPage();
  }); //function called before all test

  beforeEach(async () => {
    page = await browser.newPage();
    await page.goto("https://app.gcalls.co");
  }); //function called before every test

  // each IT is a test case
  it("SI_01-Enter page successfully", (done) => {
    new Promise(async (resolve) => {
      const title = await page.title();
      resolve(title);
    })
      .then((result) => {
        expect(result).to.equal("Gcalls - Đăng nhập");
      })
      .finally(done);
  });

  it("SI_02-Enter empty tenant", (done) => {
    new Promise(async (resolve) => {
      const title = await page.title();
      resolve(title);
    })
      .then((result) => {
        expect(result).to.equal("Gcalls - Đăng nhập");
      })
      .finally(done);
  });

  it("SI_03-CallCenter is empty", (done) => {
    new Promise(async (resolve) => {
      await page.click('button[type="submit"]');
      await page.waitForFunction(() =>
        document
          .querySelector("#tenantError")
          .textContent.includes("Tên tổng đài không được rỗng")
      );
      resolve("Not found callcenter with empty tenant");
    })
      .then((result) => {
        expect(result).to.equal("Not found callcenter with empty tenant");
      })
      .catch((error) => {
        expect("").to.equal("Not found callcenter with empty tenant");
      })
      .finally(done);
  });

  it("SI_04-Enter Wrong CallCenter", (done) => {
    new Promise(async (resolve, reject) => {
      await page.focus("#tenant");
      await page.keyboard.type("testwrong1234");
      await page.click('button[type="submit"]');
      const text = await page.waitForFunction(() =>
        document
          .querySelector("#tenantError")
          .innerText.includes("Không tìm thấy tổng đài")
      );
      resolve(text);
    })
      .then((result) => {
        expect(result).to.equal("Incorrect CallCenter2323232");
      })
      .catch((error) => {
        expect("").to.equal("Incorrect CallCenter2323232");
      })
      .finally(done);
  });

  it("SI_05-Enter Right CallCenter", (done) => {
    new Promise(async (resolve, reject) => {
      await page.focus("#tenant");
      await page.keyboard.type("gcallsintern");
      await page.click('button[type="submit"]');
      await page.waitForNavigation();

      const title = await page.title();
      resolve(title);
    })
      .then((result) => {
        return expect(result).to.match(/^ Sign in to (.+) $/);
      })
      .catch((error) => {
        expect("").to.equal("Correct CallCenter");
      })
      .finally(done);
  });

  it("SI_06-Email does not exist", (done) => {
    new Promise(async (resolve) => {
      await page.type("#tenant", "gcallsintern");
      await page.click('button[type="submit"]');
      await page.waitForSelector("#kc-page-title");

      await page.type("#username", "abc.thach@gcalls.co");
      await page.type("#password", "asdgahsdghasg");
      await page.click("#kc-login");

      await page.waitForFunction(() =>
        document
          .querySelector("#input-error")
          .textContent.includes("Invalid username or password")
      );
      resolve("Invalid username or password");
    })
      .then((result) => {
        expect(result).to.equal("Invalid username or password");
      })
      .catch((error) => {
        expect("").to.equal("Invalid username or password");
      })
      .finally(done);
  });

  it("SI_07-Password is wrong", (done) => {
    new Promise(async (resolve) => {
      await page.type("#tenant", "gcallsintern");
      await page.click('button[type="submit"]');
      await page.waitForSelector("#kc-page-title");

      await page.type("#username", "trung.thach@gcalls.co");
      await page.type("#password", "wrongpass");
      await page.click("#kc-login");

      await page.waitForFunction(() =>
        document
          .querySelector("#input-error")
          .textContent.includes("Invalid username or password")
      );
      resolve("Invalid username or password");
    })
      .then((result) => {
        expect(result).to.equal("Invalid username or password");
      })
      .catch((error) => {
        expect("").to.equal("Invalid username or password");
      })
      .finally(done);
  });

  it("SI_08-Missing all fields", (done) => {
    new Promise(async (resolve) => {
      await page.type("#tenant", "gcallsintern");
      await page.click('button[type="submit"]');
      await page.waitForSelector("#kc-page-title");

      await page.type("#username", "");
      await page.type("#password", "");
      await page.click("#kc-login");

      await page.waitForFunction(() =>
        document
          .querySelector("#input-error")
          .textContent.includes("Invalid username or password")
      );
      resolve("Invalid username or password");
    })
      .then((done) => {
        expect(result).to.equal("Notifying missing all fields");
      })
      .catch((error) => {
        expect("").to.equal("Notifying missing all fields");
      })
      .finally(done(error));
  });

  it("SI_09-Missing email", (done) => {
    new Promise(async (resolve) => {
      await page.type("#tenant", "gcallsintern");
      await page.click('button[type="submit"]');
      await page.waitForSelector("#kc-page-title");
      await page.type("#username", "");
      await page.type("#password", "wrongpass");
      await page.click("#kc-login");

      await page.waitForFunction(() =>
        document
          .querySelector("#input-error")
          .textContent.includes("Invalid username or password")
      );
      resolve("Invalid username or password");
    })
      .then((done) => {
        expect(result).to.equal("Notifying missing email");
      })
      .catch((error) => {
        expect("").to.equal("Notifying missing email");
      })
      .finally(done(error));
  });

  it("SI_10-Missing password", (done) => {
    new Promise(async (resolve) => {
      await page.type("#tenant", "gcallsintern");
      await page.click('button[type="submit"]');
      await page.waitForSelector("#kc-page-title");
      await page.type("#username", "trung.thach@gcalls.co");
      await page.type("#password", "");
      await page.click("#kc-login");

      await page.waitForFunction(() =>
        document
          .querySelector("#input-error")
          .textContent.includes("Invalid username or password")
      );
      resolve("Invalid username or password");
    })
      .then((done) => {
        expect(result).to.equal("Notifying missing password");
      })
      .catch((error) => {
        expect("").to.equal("Notifying missing password");
      })
      .finally(done(error));
  });

  it("SI_11-Email without @", (done) => {
    new Promise(async (resolve) => {
      await page.type("#tenant", "gcallsintern");
      await page.click('button[type="submit"]');
      await page.waitForSelector("#kc-page-title");
      await page.type("#username", "trung.thachgcalls.co");
      await page.type("#password", "trung123456");
      await page.click("#kc-login");

      await page.waitForFunction(() =>
        document
          .querySelector("#input-error")
          .textContent.includes("Invalid username or password")
      );
      resolve("Invalid username or password");
    })
      .then((done) => {
        expect(result).to.equal("Invalid email");
      })
      .catch((error) => {
        expect("").to.equal("Invalid email");
      })
      .finally(done(error));
  });

  it("SI_12-Email with invalid Domain", (done) => {
    new Promise(async (resolve) => {
      await page.type("#tenant", "gcallsintern");
      await page.click('button[type="submit"]');
      await page.waitForSelector("#kc-page-title");
      await page.type("#username", "trung.thachg@");
      await page.type("#password", "trung1236");
      await page.click("#kc-login");

      await page.waitForFunction(() =>
        document
          .querySelector("#input-error")
          .textContent.includes("Invalid username or password")
      );
      resolve("Invalid username or password");
    })
      .then((done) => {
        expect(result).to.equal("Invalid email");
      })
      .catch((error) => {
        expect("").to.equal("Invalid email");
      })
      .finally(done(error));
  });

  it("SI_13-Sign in successfully", (done) => {
    new Promise(async (resolve, reject) => {
      await page.type("#tenant", "gcallsintern");
      await page.click('button[type="submit"]');
      await page.waitForSelector("#kc-page-title");

      await page.type("#username", "trung.thach@gcalls.co");
      await page.type("#password", "Hao2022Trung@");
      await page.click("#kc-login");
      await page.waitForNavigation();

      const title = await page.title();
      resolve(title);
    })
      .then((result) => {
        expect(result).to.equal("Gcalls - Trang chủ");
      })
      .catch((error) => {
        expect("").to.equal("Gcalls - Trang chủ");
      })
      .finally(done);
  });

  afterEach(async () => {
    await page.close();
  });

  after(async () => {
    await browser.close();
  });
});
