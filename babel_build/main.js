(function () {
  let currentPageIndex = 0;
  let pageMode = 1;
  let cursorIndex = Math.floor(currentPageIndex / pageMode);
  let pdfInstance = null;
  let totalPagesCount = 0;

  const viewport = document.querySelector("#viewport");
  window.initPDFViewer = function (pdfURL) {
    pdfjsLib.getDocument(pdfURL).promise.then(pdf => {
      pdfInstance = pdf;
      totalPagesCount = pdf.numPages;
      initPager();
      render();
    });
  };

  function onPagerButtonsClick(event) {
    const action = event.target.getAttribute("data-pager");
    if (action === "prev") {
      if (currentPageIndex === 0) {
        return;
      }
      currentPageIndex -= pageMode;
      if (currentPageIndex < 0) {
        currentPageIndex = 0;
      }
      render();
    }
    if (action === "next") {
      if (currentPageIndex === totalPagesCount - 1) {
        return;
      }
      currentPageIndex += pageMode;
      if (currentPageIndex > totalPagesCount - 1) {
        currentPageIndex = totalPagesCount - 1;
      }
      render();
    }
  }
  function initPager() {
    const pager = document.querySelector("#pager");
    pager.addEventListener("click", onPagerButtonsClick);
    return () => {
      pager.removeEventListener("click", onPagerButtonsClick);
    };
  }

  function onPageModeChange(event) {
    pageMode = Number(event.target.value);
    render();
  }

  function render() {
    cursorIndex = Math.floor(currentPageIndex / pageMode);
    const startPageIndex = cursorIndex * pageMode;
    const endPageIndex = startPageIndex + pageMode < totalPagesCount ? startPageIndex + pageMode - 1 : totalPagesCount - 1;

    const renderPagesPromises = [];
    for (let i = startPageIndex; i <= endPageIndex; i++) {
      renderPagesPromises.push(pdfInstance.getPage(i + 1));
    }

    Promise.all(renderPagesPromises).then(pages => {
      const pagesHTML = `<div style="width: ${pageMode > 1 ? "50%" : "100%"}"><canvas id="the-canvas"></canvas></div>`.repeat(pages.length);
      viewport.innerHTML = pagesHTML;
      pages.forEach(renderPage);
    });
  }

  function renderPage(page) {
    var scale = 1;
    var viewport = page.getViewport({ scale: scale });
    var canvas = document.getElementById("the-canvas");
    var context = canvas.getContext("2d");
    canvas.height = viewport.height;
    canvas.width = viewport.width;

    var renderContext = {
      canvasContext: context,
      viewport: viewport
    };
    page.render(renderContext);
  }
})();