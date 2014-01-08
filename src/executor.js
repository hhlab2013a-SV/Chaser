var queue = [];

function execute(source) {
    eval(source);
    console.log(queue);

    return queue;
}
