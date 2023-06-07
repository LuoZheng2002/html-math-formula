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
        if (container.hasAttribute('containerType'))
        {
            // delete the complex container according to its type
            handleComplexDelete(range, container);
        }
        else
        {
            // default delete
            console.log('default delete the whole thing');
            range.setStartBefore(container);
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


function handleComplexDelete(range, container)
{
    switch(container.getAttribute('containerType'))
    {
        case 'superScriptContainer':
        case 'subScriptContainer':
            handleSuperSubScriptDelete(range, container);
            break;
                
    }
}

function handleSuperSubScriptDelete(range, container)
{
    container = container.parentElement; // superSubScriptContainer
    assert(container.hasAttribute('containerType'), 'The parent container does not have a containerType attribute');
    assert(container.getAttribute('containerType') == 'superSubScriptContainer', 'The parent container is not superSubScriptContainer');
    assert(container.childNodes.length == 2, 'The superSubScriptContainer does not have 2 child nodes');
    var superScript = container.childNodes[0];
    var subScript = container.childNodes[1];
    assert(superScript.hasAttribute('containerType') && superScript.getAttribute('containerType') == 'superScriptContainer', 'The first child is not superScriptContainer');
    assert(subScript.hasAttribute('containerType') && subScript.getAttribute('containerType') == 'subScriptContainer', 'The second child is not subScriptContainer');
    // Only when both superscript and subscript are empty, the container is allowed to destroy.
    if (superScript.innerHTML == '&nbsp;' && subScript.innerHTML == '&nbsp;')
    {
        range.setStartBefore(container);
        container.remove();
        console.log('Because both superscript and subscript are empty, the container is allowed to be deleted');
    }
    else
    {
        console.log('Because either superscript or subscript is not empty, the container is not allowed to be deleted');
    }
}