### POC. Table component validation

https://table-poc.netlify.app/

Some keyboard events


> Command + A - select all
 
> Control + Z / Delete / Backspace - undo
 
> ArrowUp / ArrowDown - navigate
 
> Enter - select item
 
> Shift + mouse click - select range

> Escape - unselect all items


### Main conclusions

1. Dividing the table component into smaller parts will increase the flexibility of the architecture

Flexible
```
import { Table, TBody, Th, THead, Tr } from '../components/table/table';

<Table>
    <THead>
        <Tr>
            Hello
        </Tr>
        <Tr>
            World
        </Tr>
    </THead>
    <TBody>
        <Tr>
            <Td>
                Hello
            </Td>
            <Td>
                World
            </Td>
        </Tr>
    </TBody>
</Table>
```

Not flexible
```
import { Table } from '../components/table/table';

<Table
    headers={...}
    hiddenHeaders={...}
    columnOrders={...}
    rows={...}
    ...
    ...
    ...
    ...
    // and many more
  />
```


2. Hook useKeyboardEvent can be updated and cover most of the cases
