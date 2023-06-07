var editableDiv = document.getElementById('editable-div');


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