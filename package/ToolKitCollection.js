const ToolKitCollection = {
    description: () => {
        console.log(
            "Hello 👋, 42 is an answer for everything.\n %c..",
            "background: url(https://cdn.jsdelivr.net/gh/bxb100/bxb100@master/png2.png) no-repeat left center;font-size: 400px;color: transparent;",
            "\nbusy writing bugs\nsee more in https://github.com/bxb100");
    },
    eventStopByStart: (event, text, bool) => {
        const innerText = event?.scirpt?.innerText
        if (!bool && innerText && innerText.startsWith(text)) {
            bool = true;
            event.preventDefault();
        }
        return bool;
    }
};