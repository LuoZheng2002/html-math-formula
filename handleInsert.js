function handleInsert(event, range, container)
{
    switch(event.data)
    {
        case '^':
        case '_':
            handleCaretOrUnderscore(event, range, container);
            break;
        default:
            // if there is only a white space, replace the white space with the character inserted.
            if (container.innerHTML == '&nbsp;')
            {
                event.preventDefault();
                console.log('The white space is replaced by a character');
                container.innerText = event.data;
                range.setStart(container, 1);
            }
    }
}

function handleCaretOrUnderscore(event, range, container)
{
    event.preventDefault();
    console.log('Add a new super-sub-script container');
    // create elements
    var superSubScriptContainer = document.createElement('span');
    var superScriptBlock = document.createElement('span');
    var subScriptBlock = document.createElement('span');
    var superScriptInner = document.createElement('span');
    var subScriptInner = document.createElement('span');
    // set attributes
    superSubScriptContainer.setAttribute(ATT_CONTAINER_TYPE, CT_SUPERSUBSCRIPT);
    superScriptBlock.setAttribute(ATT_CONTAINER_TYPE, CT_SUPERSCRIPT);
    subScriptBlock.setAttribute(ATT_CONTAINER_TYPE, CT_SUBSCRIPT);
    superScriptInner.setAttribute(ATT_CONTAINER_TYPE, CT_CHARACTER_CONTAINER);
    subScriptInner.setAttribute(ATT_CONTAINER_TYPE, CT_CHARACTER_CONTAINER);

    var size;
    var sizeClass;
    if (!container.hasAttribute(ATT_SIZE) || container.getAttribute(ATT_SIZE) == SZ_NORMAL)
    {
        size = SZ_SMALL;
        sizeClass = CN_SMALL;
    }
    else
    {
        size = SZ_VERY_SMALL;
        sizeClass = CN_VERY_SMALL;
    }
    superSubScriptContainer.setAttribute(ATT_SIZE, size);
    superScriptBlock.setAttribute(ATT_SIZE, size);
    subScriptBlock.setAttribute(ATT_SIZE, size);
    superScriptInner.setAttribute(ATT_SIZE, size);
    subScriptInner.setAttribute(ATT_SIZE, size);
    // assign classes
    superSubScriptContainer.className = CN_SUPERSUBSCRIPT + ' ' + sizeClass;
    superScriptBlock.className = CN_SUPERSCRIPT + ' ' + sizeClass;
    subScriptBlock.className = CN_SUBSCRIPT + ' ' + sizeClass;
    superScriptInner.className = CN_CHARACTER_CONTAINER + ' ' + sizeClass;
    subScriptInner.className = CN_CHARACTER_CONTAINER + ' ' + sizeClass;
    // assign colors
    superSubScriptContainer.style.backgroundColor=randomColor();
    superScriptBlock.style.backgroundColor = randomColor();
    subScriptBlock.style.backgroundColor = randomColor();
    superScriptInner.style.backgroundColor = randomColor();
    subScriptInner.style.backgroundColor = randomColor();
    // assign initial content
    superScriptInner.innerHTML='&nbsp;';
    subScriptInner.innerHTML ='&nbsp;';
    // assemble
    superScriptBlock.appendChild(superScriptInner);
    subScriptBlock.appendChild(subScriptInner);
    superSubScriptContainer.appendChild(superScriptBlock);
    superSubScriptContainer.appendChild(subScriptBlock);
    // put into place
    console.log('The container that insert the new container after it: ' + container.getAttribute(ATT_CONTAINER_TYPE));
    container.insertAdjacentElement('afterend', superSubScriptContainer);
    switch(event.data)
    {
        case '^':
            range.setStart(superScriptInner, 0);
            break;
        case '_':
            range.setStart(subScriptInner, 0);
            break;
    }
}
