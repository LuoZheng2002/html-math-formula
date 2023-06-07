var editableDiv = document.getElementById('editable-div');
var mainHorizontalContainer = document.getElementById('mainHorizontalContainer');
var span1 = document.getElementById('span1');
var span2 = document.getElementById('span2');
editableDiv.style.backgroundColor = randomColor();
mainHorizontalContainer.style.backgroundColor = randomColor();
span1.style.backgroundColor = randomColor();
span2.style.backgroundColor = randomColor();

span1.setAttribute(ATT_CONTAINER_TYPE, CT_CHARACTER_CONTAINER);
span2.setAttribute(ATT_CONTAINER_TYPE, CT_CHARACTER_CONTAINER);


editableDiv.addEventListener('beforeinput', function(event)
{
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    var container = range.startContainer;
    // get the desired span container if it is not the one
    container = getSpanContainer(container);

    if (event.inputType == 'deleteContentBackward')
    {
        handleDelete(event, range, container);
    }
    else if (event.inputType == 'insertText')
    {
        handleInsert(event ,range, container);
    }
});
function tryCreateNewFromSuperSubScript(range, container)
{
    console.log('Add new character container from superSubScript');
    container = container.parentElement;
    assert(container.getAttribute(ATT_CONTAINER_TYPE) == CT_SUPERSUBSCRIPT, 'The parent element is supposed to be superSubScript');
    // try go to next sibling
    if (container.nextSibling != null && container.nextSibling.nodeName=='SPAN')
    {
        console.log('Go to the next sibling');
        var nextSibling = container.nextSibling;
        range.setStart(nextSibling, 0);
    }
    else
    {
        // create
        var newCharacterContainer = document.createElement('span');
        // content
        newCharacterContainer.innerHTML = '&nbsp;';
        // class
        newCharacterContainer.class = 'characterContainer';
        // color
        newCharacterContainer.style.backgroundColor = randomColor();
        // attribute
        newCharacterContainer.setAttribute('containerType', 'characterContainer');
        // insert
        container.insertAdjacentElement('afterend', newCharacterContainer);
        range.setStart(newCharacterContainer, 0);
    }
}
editableDiv.addEventListener('keydown', function(event)
{
    var selection = window.getSelection();
    var range = selection.getRangeAt(0);
    var container = range.startContainer;
    // get the desired span container if it is not the one
    container = getSpanContainer(container);

    if (event.key == 'ArrowRight' && range.startOffset == container.innerText.length)
    {
        event.preventDefault();
        var parent = container.parentElement;
        if (container.nextSibling != null && container.nextSibling.nodeName=='SPAN')
        {
            console.log('Go to the next sibling');
            var nextSibling = container.nextSibling;
            range.setStart(nextSibling, 0);
        }
        else
        {
            switch(parent.getAttribute(ATT_CONTAINER_TYPE))
            {
                case CT_SUPERSCRIPT:
                case CT_SUBSCRIPT:
                    tryCreateNewFromSuperSubScript(range, parent);
                    break;
                default:
                    assert(false,'unknown type');
            }
        }
    }
})