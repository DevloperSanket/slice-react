const gs = {

  showLoader: (status) => {
    let elem = document.querySelector(".loaderBig");

    if (elem) {
      if (status) {
        elem.classList.add("show");
      } else {
        elem.classList.remove("show");
      }
    }

  },
  debounce: (func, delay) => {
    let debounceTimer;
    return function () {
      const context = this;
      const args = arguments;
      clearTimeout(debounceTimer);
      debounceTimer = setTimeout(() => func.apply(context, args), delay);
    };
  },
};

export default gs;
