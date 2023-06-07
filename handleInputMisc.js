function getSpanContainer(container)
{
    console.log('Container type: ' + container.nodeName);
    if (container.nodeName=='#text')
    {
        container = container.parentElement;
        console.log('Container type changed to ' + container.nodeName);
    }
    else if(container.nodeName == 'DIV')
    {
        assert(container.childNodes.length >=2, 'The div element is supposed to have at least 2 elements');
        var child = container.childNodes[container.childNodes.length - 1];
        // want the last span element of div element. If the last element is text, choose the last but one element.
        if (child.nodeName=='#text'){
            container = container.childNodes[container.childNodes.length - 2];
            assert(container.nodeName=='SPAN', 'The last but one element of div element is supposed to be a span element');
        }
        else{
            assert(container.nodeName=='SPAN', 'The last element of div element is supposed to be a span if not a text');
            container = child;
        }
        console.log('Container type changed to ' + container.nodeName);
    }
    return container;
}