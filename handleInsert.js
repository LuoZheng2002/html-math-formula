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
    var superScriptSpan = document.createElement('span');
    var subScriptSpan = document.createElement('span');
    // set attributes
    superSubScriptContainer.setAttribute('layer', 'outer');            
    superScriptSpan.setAttribute('layer', 'inner');
    subScriptSpan.setAttribute('layer', 'inner');
    superSubScriptContainer.setAttribute('containerType', 'superSubScriptContainer');
    superScriptSpan.setAttribute('containerType', 'superScriptContainer');
    subScriptSpan.setAttribute('containerType', 'subScriptContainer');
    // assign classes
    superSubScriptContainer.className = 'superSubScript';
    superScriptSpan.className = 'superScript';
    subScriptSpan.className = 'subScript';
    // assign colors
    superSubScriptContainer.style.backgroundColor=randomColor();
    superScriptSpan.style.backgroundColor = randomColor();
    subScriptSpan.style.backgroundColor = randomColor();
    // assign initial content
    superScriptSpan.innerHTML='&nbsp;';
    subScriptSpan.innerHTML ='&nbsp;';
    // assemble
    superSubScriptContainer.appendChild(superScriptSpan);
    superSubScriptContainer.appendChild(subScriptSpan);
    // put into place
    console.log('The container that insert the new container after it: ' + container.getAttribute('containerType'));
    container.insertAdjacentElement('afterend', superSubScriptContainer);
    switch(event.data)
    {
        case '^':
            range.setStart(superScriptSpan, 0);
            break;
        case '_':
            range.setStart(subScriptSpan, 0);
            break;
    }
}
