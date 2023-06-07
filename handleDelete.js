function setCursorToPreviousElement(range, previousContainer)
{
    assert(previousContainer.hasAttribute(ATT_CONTAINER_TYPE), 'The previous element should have attribute containerType');
    switch(previousContainer.getAttribute(ATT_CONTAINER_TYPE))
    {
        case CT_SUPERSUBSCRIPT:
            var subScriptContainer = previousContainer.childNodes[1];
            range.setStart(subScriptContainer, 1);
            range.setEnd(subScriptContainer, 1);
            break;
        case CT_CHARACTER_CONTAINER:
            range.setStart(previousContainer, 1);
            range.setEnd(previousContainer, 1);
            break;
        default:
            assert(false, 'The container type does not match any.');
    }
}

function handleDelete(event, range, container)
{
    // prevent deleting when the cursor is at the beginning and the content is not empty
    if(range.startOffset == 0 && container.innerHTML!='&nbsp;'){
        event.preventDefault();
        console.log('prevent deleting because the content is not empty');
    }
    // delete the whole thing when there is only a white space left
    else if(container.innerHTML == '&nbsp;')
    {
        event.preventDefault();
        var parent = container.parentElement;
        // nothing left in the big container, try delete the big container
        if (parent.childNodes.length == 1)
        {
            switch(parent.getAttribute(ATT_CONTAINER_TYPE))
            {
                case CT_SUPERSCRIPT:
                case CT_SUBSCRIPT:
                    handleSuperSubScriptDelete(range, parent);
                    break;
                default:
                    assert(false, 'Unknown big container');
                    break;
            }
        }
        // delete the small container
        else
        {
            // default delete
            console.log('default delete the whole thing');
            setCursorToPreviousElement(range, container.previousSibling);
            container.remove();
        }
    }
    // create a white space when there is only one character left
    else if (container.innerText.length == 1)
    {
        event.preventDefault();
        console.log('add a whitespace when there is no content left');
        container.innerHTML = '&nbsp;';
        range.setStart(container, 1);
    }
}


    

function handleSuperSubScriptDelete(range, container)
{
    container = container.parentElement; // superSubScriptContainer
    assert(container.hasAttribute(ATT_CONTAINER_TYPE), 'The parent container does not have a containerType attribute');
    assert(container.getAttribute(ATT_CONTAINER_TYPE) == CT_SUPERSUBSCRIPT, 'The parent container is not superSubScriptContainer');
    assert(container.childNodes.length == 2, 'The superSubScriptContainer does not have 2 child nodes');
    var superScript = container.childNodes[0];
    var subScript = container.childNodes[1];
    assert(superScript.hasAttribute(ATT_CONTAINER_TYPE) && superScript.getAttribute(ATT_CONTAINER_TYPE) == CT_SUPERSCRIPT, 'The first child is not superScriptContainer');
    assert(subScript.hasAttribute(ATT_CONTAINER_TYPE) && subScript.getAttribute(ATT_CONTAINER_TYPE) == CT_SUBSCRIPT, 'The second child is not subScriptContainer');
    // Only when both superscript and subscript are empty, the container is allowed to destroy.
    var superScriptEmpty = superScript.childNodes.length == 1 && superScript.childNodes[0].innerHTML == '&nbsp;';
    var subScriptEmpty = subScript.childNodes.length == 1 && subScript.childNodes[0].innerHTML == '&nbsp;';
    if (superScriptEmpty && subScriptEmpty)
    {
        console.log('previousSibling: '+ container.previousSibling);
        setCursorToPreviousElement(range, container.previousSibling);        
        container.remove();
        console.log('Because both superscript and subscript are empty, the container is allowed to be deleted');
    }
    else
    {
        console.log('Because either superscript or subscript is not empty, the container is not allowed to be deleted');
    }
}