const puppeteer = require("puppeteer");
const expect = require("chai").expect;

describe("Test Register page", () => {
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
  });

  it("SU_0- Enter register page successfully", (done) => {
    new Promise(async (resolve) => {
      await page.setViewport({
        width: 1920,
        height: 1080,
      });
      const logoLink = ".logo";
      await page.evaluate((logoLink) => {
        // Find the element by class name
        const link = document.querySelector(logoLink);
        // Trigger a click event on the element
        link.click();
      }, logoLink);
      await page.waitForSelector(".swal-button--confirm");
      await page.click(".swal-button--confirm");
      const title = await page.title();
      resolve(title);
    }).then((result) => {
      expect(result).to.equal("Gcalls - Đăng ký");
      done();
    });
  });

  it("SU_01- Enter email successfully", (done) => {
    new Promise(async (resolve) => {
      await page.setViewport({
        width: 1920,
        height: 1080,
      });
      const logoLink = ".logo";
      await page.evaluate((logoLink) => {
        // Find the element by class name
        const link = document.querySelector(logoLink);
        // Trigger a click event on the element
        link.click();
      }, logoLink);
      await page.waitForSelector(".swal-button--confirm");
      await page.click(".swal-button--confirm");
      await page.focus("#tenant");
      await page.keyboard.type("automationtestRegister");
      await page.focus("#email");
      await page.keyboard.type("trungthti84@gmail.com");
      await page.click('button[type="submit"]');
      const title = await page.title();
      resolve(title);
    })
      .then((result) => {
        expect(result).to.equal("Gcalls - đăng ký");
      })
      .finally(done);
  });

  it("SU_01- Confirm email", (done) => {
    new Promise(async (resolve) => {
      const url =
        "https://app.gcalls.co/g/confirm/bba2a8ff6b1b986d23ac7e14006ee6d26135b1b42ebedd96665107026692dc5227977276bc387ada2052b2f15ca5711655789";
      await page.goto(url);
      const result = await page.url();
      resolve(result, url);
    })
      .then((result, url) => {
        expect(result.trim()).to.equal(url);
      })
      .finally(done);
  });

  it("SU_02- Notify that existed callcenter", (done) => {
    new Promise(async (resolve) => {
      await page.setViewport({
        width: 1920,
        height: 1080,
      });
      const logoLink = ".logo";
      await page.evaluate((logoLink) => {
        // Find the element by class name
        const link = document.querySelector(logoLink);
        // Trigger a click event on the element
        link.click();
      }, logoLink);
      await page.waitForSelector(".swal-button--confirm");
      await page.click(".swal-button--confirm");
      await page.focus("#tenant");
      await page.keyboard.type("gcallsintern");
      await page.focus("#email");
      await page.keyboard.type("trungthti84@gmail.com");
      await page.click('button[type="submit"]');

      const text = await page.waitForFunction(() =>
        document
          .querySelector("#tenantError")
          .innerText.includes("Tổng đài đã tồn tạ")
      );
      resolve(text);
    })
      .then((result) => {
        expect(result).to.equal("Tổng đài đã tồn tạ");
      })
      .finally(done);
  });

  it("SU_03- Notify that existed email", (done) => {
    new Promise(async (resolve) => {
      await page.setViewport({
        width: 1920,
        height: 1080,
      });
      const logoLink = ".logo";
      await page.evaluate((logoLink) => {
        // Find the element by class name
        const link = document.querySelector(logoLink);
        // Trigger a click event on the element
        link.click();
      }, logoLink);
      await page.waitForSelector(".swal-button--confirm");
      await page.click(".swal-button--confirm");
      await page.focus("#tenant");
      await page.keyboard.type("gcallsintern2");
      await page.focus("#email");
      await page.keyboard.type("trungthti84@gmail.com");
      await page.click('button[type="submit"]');

      const text = await page.waitForFunction(() =>
        document
          .querySelector("#tenantError")
          .innerText.includes("Tổng đài đã tồn tạ")
      );
      resolve(text);
    })
      .then((result) => {
        expect(result).to.equal("Email existed");
        done();
      })
      .catch((error) => {
        expect("").to.equal("Email existed");
      })
      .finally(done(error));
  });

  it("SU_04- Missing email", (done) => {
    new Promise(async (resolve) => {
      await page.setViewport({
        width: 1920,
        height: 1080,
      });
      const logoLink = ".logo";
      await page.evaluate((logoLink) => {
        // Find the element by class name
        const link = document.querySelector(logoLink);
        // Trigger a click event on the element
        link.click();
      }, logoLink);
      await page.waitForSelector(".swal-button--confirm");
      await page.click(".swal-button--confirm");
      await page.focus("#tenant");
      await page.keyboard.type("gcallsintern2");
      await page.focus("#email");
      await page.keyboard.type("");
      await page.click('button[type="submit"]');

      const text = await page.waitForFunction(() =>
        document
          .querySelector("#emailError")
          .innerText.includes("Email Admin không được rỗng")
      );
      resolve(text);
    })
      .then((result) => {
        expect(result).to.equal("Email Admin không được rỗng");
        done();
      })
      .finally(done);
  });

  it("SU_05- Email without Local part", (done) => {
    new Promise(async (resolve) => {
      await page.setViewport({
        width: 1920,
        height: 1080,
      });
      const logoLink = ".logo";
      await page.evaluate((logoLink) => {
        // Find the element by class name
        const link = document.querySelector(logoLink);
        // Trigger a click event on the element
        link.click();
      }, logoLink);
      await page.waitForSelector(".swal-button--confirm");
      await page.click(".swal-button--confirm");
      await page.focus("#tenant");
      await page.keyboard.type("gcallsintern2");
      await page.focus("#email");
      await page.keyboard.type("@gmail.com");
      await page.click('button[type="submit"]');

      const text = await page.waitForFunction(() =>
        document
          .querySelector("#emailError")
          .innerText.includes("Email Admin không đúng định dạng")
      );
      resolve(text);
    })
      .then((result) => {
        expect(result).to.equal("Email Admin không đúng định dạng");
        done();
      })
      .finally(done);
  });

  it("SU_06- Email without Domain", (done) => {
    new Promise(async (resolve) => {
      await page.setViewport({
        width: 1920,
        height: 1080,
      });
      const logoLink = ".logo";
      await page.evaluate((logoLink) => {
        // Find the element by class name
        const link = document.querySelector(logoLink);
        // Trigger a click event on the element
        link.click();
      }, logoLink);
      await page.waitForSelector(".swal-button--confirm");
      await page.click(".swal-button--confirm");
      await page.focus("#tenant");
      await page.keyboard.type("gcallsintern2");
      await page.focus("#email");
      await page.keyboard.type("trungthach@");
      await page.click('button[type="submit"]');

      const text = await page.waitForFunction(() =>
        document
          .querySelector("#emailError")
          .innerText.includes("Email Admin không đúng định dạng")
      );
      resolve(text);
    })
      .then((result) => {
        expect(result).to.equal("Email Admin không đúng định dạng");
        done();
      })
      .finally(done);
  });

  it("SU_07- Email with invalid Domain", (done) => {
    new Promise(async (resolve) => {
      await page.setViewport({
        width: 1920,
        height: 1080,
      });
      const logoLink = ".logo";
      await page.evaluate((logoLink) => {
        // Find the element by class name
        const link = document.querySelector(logoLink);
        // Trigger a click event on the element
        link.click();
      }, logoLink);
      await page.waitForSelector(".swal-button--confirm");
      await page.click(".swal-button--confirm");
      await page.focus("#tenant");
      await page.keyboard.type("gcallsintern2");
      await page.focus("#email");
      await page.keyboard.type("trung.thach@gmail");
      await page.click('button[type="submit"]');

      const text = await page.waitForFunction(() =>
        document
          .querySelector("#emailError")
          .innerText.includes("Email Admin không đúng định dạng")
      );
      resolve(text);
    })
      .then((result) => {
        expect(result).to.equal("Email Admin không đúng định dạng");
        done();
      })
      .finally(done);
  });

  it("SU_08- Clicking 'Sign in' hyperlink when user is in 'signup' screen", (done) => {
    new Promise(async (resolve) => {
      await page.setViewport({
        width: 1920,
        height: 1080,
      });
      const logoLink = ".logo";
      await page.evaluate((logoLink) => {
        // Find the element by class name
        const link = document.querySelector(logoLink);
        // Trigger a click event on the element
        link.click();
      }, logoLink);
      await page.waitForSelector(".swal-button--confirm");
      await page.click(".swal-button--confirm");
      await page.click("a[href='/g/']");
      const title = await page.title();

      resolve(title);
    })
      .then((result) => {
        expect(result).to.equal("Gcalls - Đăng nhập");
        done();
      })
      .catch((error) => {
        expect("").to.equal("Gcalls - Đăng nhập");
      })
      .finally(done(error));
  });

  it("SU_09- Navigating to 'forgetpassword' screen", (done) => {
    new Promise(async (resolve) => {
      const url = "https://app.gcalls.co/g/forgetcallcentername";
      await page.goto(url);
      await page.focus("#email");
      await page.keyboard.type("wendythach489@gmail.com");
      await page.click('button[type="submit"]');

      const title = await page.title();

      resolve(title);
    })
      .then((result) => {
        expect(result).to.equal("Forget Password Screen");
        done();
      })
      .catch((error) => {
        expect("").to.equal("Forget Password Screen");
      })
      .finally(done(error));
  });

  it("SU_11- Sign Up successfully", (done) => {
    new Promise(async (resolve) => {
      const url =
        "https://app.gcalls.co/g/confirm/6bbd39bad178d69ccd745f02f47e71a5581be9301361fbe2e30ebac96ad79d72fe3ab8fad7156965e3795469bb6ced677a7a2";
      await page.goto(url);
      const password = "12345678910";
      const confirmPass = "12345678910";

      await page.focus("#password");
      await page.keyboard.type(password);
      await page.focus("#passwordConfirm");
      await page.keyboard.type(confirmPass);
      await page.click('button[type="submit"]');
      const result = await page.url();
      resolve(result);
    })
      .then((result) => {
        expect(result).to.equal("https://app.gcalls.co/g/login");
      })
      .finally(done);
  });

  it("SU_12- Sign Up successfully with 8 characters", (done) => {
    new Promise(async (resolve) => {
      const url =
        "https://app.gcalls.co/g/confirm/6bbd39bad178d69ccd745f02f47e71a5581be9301361fbe2e30ebac96ad79d72fe3ab8fad7156965e3795469bb6ced677a7a2";
      await page.goto(url);
      const password = "12345678910";
      const confirmPass = "12345678910";

      await page.focus("#password");
      await page.keyboard.type(password);
      await page.focus("#passwordConfirm");
      await page.keyboard.type(confirmPass);
      await page.click('button[type="submit"]');
      const result = await page.url();
      resolve(result);
    })
      .then((result) => {
        expect(result).to.equal("https://app.gcalls.co/g/login");
      })
      .finally(done);
  });

  it("SU_13- Sign Up successfully with 32 characters", (done) => {
    new Promise(async (resolve) => {
      const url =
        "https://app.gcalls.co/g/confirm/6bbd39bad178d69ccd745f02f47e71a5581be9301361fbe2e30ebac96ad79d72fe3ab8fad7156965e3795469bb6ced677a7a2";
      await page.goto(url);
      const password = "12345678910";
      const confirmPass = "12345678910";

      await page.focus("#password");
      await page.keyboard.type(password);
      await page.focus("#passwordConfirm");
      await page.keyboard.type(confirmPass);
      await page.click('button[type="submit"]');
      const result = await page.url();
      resolve(result);
    })
      .then((result) => {
        expect(result).to.equal("https://app.gcalls.co/g/login");
      })
      .finally(done);
  });

  it("SU_14- Sign Up unsuccessfully with 7 characters", (done) => {
    new Promise(async (resolve) => {
      const url =
        "https://app.gcalls.co/g/confirm/6bbd39bad178d69ccd745f02f47e71a5581be9301361fbe2e30ebac96ad79d72fe3ab8fad7156965e3795469bb6ced677a7a2";
      await page.goto(url);
      const password = "1234567";
      const confirmPass = "1234567";

      await page.focus("#password");
      await page.keyboard.type(password);
      await page.focus("#passwordConfirm");
      await page.keyboard.type(confirmPass);
      await page.click('button[type="submit"]');

      const text = await page.waitForFunction(() =>
        document
          .querySelector("#passwordError")
          .textContent.includes("Mật khẩu không đúng định dạng")
      );

      resolve(text);
    })
      .then((result) => {
        expect(result).to.equal("Mật khẩu không đúng định dạng");
      })
      .finally(done);
  });

  it("SU_15- Sign Up unsuccessfully with 33 characters", (done) => {
    new Promise(async (resolve) => {
      const url =
        "https://app.gcalls.co/g/confirm/6bbd39bad178d69ccd745f02f47e71a5581be9301361fbe2e30ebac96ad79d72fe3ab8fad7156965e3795469bb6ced677a7a2";
      await page.goto(url);
      const password = "1234567891011121314151617181920323344556";
      const confirmPass = "1234567891011121314151617181920323344556";

      await page.focus("#password");
      await page.keyboard.type(password);
      await page.focus("#passwordConfirm");
      await page.keyboard.type(confirmPass);
      await page.click('button[type="submit"]');

      const text = await page.waitForFunction(() =>
        document
          .querySelector("#passwordError")
          .textContent.includes("Mật khẩu không đúng định dạng")
      );

      resolve(text);
    })
      .then((result) => {
        expect(result).to.equal("Mật khẩu không đúng định dạng");
      })
      .finally(done);
  });

  it("SU_16- Missing all fields", (done) => {
    new Promise(async (resolve) => {
      const url =
        "https://app.gcalls.co/g/confirm/6bbd39bad178d69ccd745f02f47e71a5581be9301361fbe2e30ebac96ad79d72fe3ab8fad7156965e3795469bb6ced677a7a2";
      await page.goto(url);
      const password = "";
      const confirmPass = "";

      await page.focus("#password");
      await page.keyboard.type(password);
      await page.focus("#passwordConfirm");
      await page.keyboard.type(confirmPass);
      await page.click('button[type="submit"]');

      const text1 = await page.waitForFunction(() =>
        document
          .querySelector("#passwordError")
          .textContent.includes("Mật khẩu không được rỗng")
      );
      const text2 = await page.waitForFunction(() =>
        document
          .querySelector("#passwordConfirmError")
          .textContent.includes("Nhập lại mật khẩu không được rỗng")
      );

      resolve(text1, text2);
    })
      .then((result1, result2) => {
        expect(
          result1.to.equal("Mật khẩu không được rỗng") &&
            result2.to.equal("Nhập lại mật khẩu không được rỗng")
        );
      })
      .finally(done);
  });

  it("SU_17- Missing password field", (done) => {
    new Promise(async (resolve) => {
      const url =
        "https://app.gcalls.co/g/confirm/6bbd39bad178d69ccd745f02f47e71a5581be9301361fbe2e30ebac96ad79d72fe3ab8fad7156965e3795469bb6ced677a7a2";
      await page.goto(url);
      const password = "";
      const confirmPass = "123456789";

      await page.focus("#password");
      await page.keyboard.type(password);
      await page.focus("#passwordConfirm");
      await page.keyboard.type(confirmPass);
      await page.click('button[type="submit"]');

      const text1 = await page.waitForFunction(() =>
        document
          .querySelector("#passwordError")
          .textContent.includes("Mật khẩu không được rỗng")
      );
      const text2 = await page.waitForFunction(() =>
        document
          .querySelector("#passwordConfirmError")
          .textContent.includes("Nhập lại mật khẩu không trùng khớp")
      );

      resolve(text1, text2);
    })
      .then((result1, result2) => {
        expect(
          result1.to.equal("Mật khẩu không được rỗng") &&
            result2.to.equal("Nhập lại mật khẩu không trùng khớp")
        );
      })
      .finally(done);
  });

  it("SU_18- Missing confirmPassword field", (done) => {
    new Promise(async (resolve) => {
      const url =
        "https://app.gcalls.co/g/confirm/6bbd39bad178d69ccd745f02f47e71a5581be9301361fbe2e30ebac96ad79d72fe3ab8fad7156965e3795469bb6ced677a7a2";
      await page.goto(url);
      const password = "12345678910";
      const confirmPass = "";

      await page.focus("#password");
      await page.keyboard.type(password);
      await page.focus("#passwordConfirm");
      await page.keyboard.type(confirmPass);
      await page.click('button[type="submit"]');

      const text = await page.waitForFunction(() =>
        document
          .querySelector("#passwordConfirmError")
          .textContent.includes("Nhập lại mật khẩu không được rỗng")
      );

      resolve(text);
    })
      .then((result) => {
        expect(result).to.equal("Nhập lại mật khẩu không được rỗng");
      })
      .finally(done);
  });

  it("SU_19- Pasword and Confirmpassword do not match", (done) => {
    new Promise(async (resolve) => {
      const url =
        "https://app.gcalls.co/g/confirm/6bbd39bad178d69ccd745f02f47e71a5581be9301361fbe2e30ebac96ad79d72fe3ab8fad7156965e3795469bb6ced677a7a2";
      await page.goto(url);
      const password = "12345678910";
      const confirmPass = "12345678910111";

      await page.focus("#password");
      await page.keyboard.type(password);
      await page.focus("#passwordConfirm");
      await page.keyboard.type(confirmPass);
      await page.click('button[type="submit"]');

      const text = await page.waitForFunction(() =>
        document
          .querySelector("#passwordConfirmError")
          .textContent.includes("Nhập lại mật khẩu không trùng khớp")
      );

      resolve(text);
    })
      .then((result) => {
        expect(result).to.equal("Nhập lại mật khẩu không trùng khớp");
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
