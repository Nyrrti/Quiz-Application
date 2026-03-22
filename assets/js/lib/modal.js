class Modal {
    constructor() {

    }

    openModal() {
        modal.classList.add("show");
    }

    closeModal() {
        modal.classList.remove("show");
    }

    closeModalOutside() {
        /* Close when clicking outside the modal box */
        modal.addEventListener("click", function (event) {
            if (event.target === modal) {
                closeModal();
            }
        });
    }

    closeModalKey() {
        /* Close when pressing Escape */
        document.addEventListener("keydown", function (event) {
            if (event.key === "Escape") {
            closeModal();
            }
        });
    }

    createModalBackground() {
        const div = document.createElement("div");
        div.id = "quizEnd" ;
        div.className = "col-12 bg-fill border modal-test";
        document.body.appendChild(div);
    }

}

