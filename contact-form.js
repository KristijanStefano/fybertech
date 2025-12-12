
const form = document.getElementById("contact-form");
const emailEl = document.getElementById("email");
const submitBtn = document.querySelector(".submit-contact");
submitBtn.disabled = true;
const formResponse = document.querySelector(".form__response");
console.log(emailEl.parentElement);

const debounce = (fn, delay = 300) => {
  let timeoutId;
  return (...args) => {
    // cancel the previous timer
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    // setup a new timer
    timeoutId = setTimeout(() => {
      fn.apply(null, args);
    }, delay);
  };
};

function createElement(type, options = {}) {
  const element = document.createElement(type)
  Object.entries(options).forEach(([key, value]) => {
      if (key === "class") {
          element.classList.add(value)
          return
      }

      if (key === "dataset") {
          Object.entries(value).forEach(([dataKey, dataValue]) => {
              element.dataset[dataKey] = dataValue
          })
          return
      }

      if (key === "text") {
          element.textContent = value
          return
      }

      element.setAttribute(key, value)
  })
  return element
}

form.addEventListener("input", debounce(function (e) {
    // checking email validation
    submitBtn.disabled = checkEmail() ? false : true;
  })
);

form.addEventListener("submit", (e) => {
  e.preventDefault();

  // submit to the server if the form is valid
  if (checkEmail()) {
    const body = new FormData(form);
    const url = "./mailer.php";
    const req = new Request(url, {
      method: "POST",
      body,
    });

    fetch(req)
      .then((res) => res.text())
      .then((data) => {
        form.reset();
        submitBtn.disabled = true;
        formResponse.innerHTML = "Thank You! Your email has been sent.";
        formResponse.classList.add("form-response-success");
        console.log("email sent", data);
        clearContent(formResponse);
      })
      .catch((err) => {
        console.error(err);
        formResponse.innerHTML = "Oops! An error occured and your email could not be sent.";
        formResponse.classList.add("form-response-danger");
        clearContent(formResponse);
      });
  }
});

const isRequired = (value) => (value === "" ? false : true);
const isEmailValid = (email) => {
  const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

function clearContent(content) {
  setTimeout(function () {
    if (content.textContent.length > 0) {
      content.textContent = '';
      content.classList.remove("form-response-success", "form-response-danger");
    }
  }, 5000);
};

const showError = (input, message) => {

  // get the form-field element
  const formField = input.parentElement;
  // add the error class
  formField.classList.remove("success");
  formField.classList.add("error");

  // show the error message
  const errorMess = formField.querySelector(".error-field");
  if (!errorMess) {
    const errorMessage = createElement("span", { class: "error-field" });
    errorMessage.textContent = message;
    formField.append(errorMessage);
  } else {
    errorMess.textContent = message;
  }
};

const showSuccess = (input) => {
  // get the form-field element
  const formField = input.parentElement;

  // remove the error class
  formField.classList.remove("error");
  formField.classList.add("success");

  // hide the error message
  const errorMessage = formField.querySelector(".error-field");

  if (errorMessage) {
    errorMessage.remove();
  }
};

const checkEmail = () => {
  let valid = false;
  const email = emailEl.value.trim();
  if (!isRequired(email)) {
    showError(emailEl, "Email cannot be blank.");
  } else if (!isEmailValid(email)) {
    showError(emailEl, "Email is not valid.");
  } else {
    showSuccess(emailEl);
    valid = true;
  }
  return valid;
};
