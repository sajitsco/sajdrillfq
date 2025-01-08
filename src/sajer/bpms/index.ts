import type { TaskDef, TreeItem } from "./entities";

const list: TaskDef[] = [
    {code: '12', label: 'label12', opG: 'vVv', prG: '', prtN: 'Part1', prS: 0, ocM: ''},
    {code: '11', label: 'label11', opG: 'vVv', prG: 'Group1', prtN: 'Part1', prS: 0, ocM: ''},
    {code: '0', label: 'label13', opG: 'Xarid', prG: '', prtN: 'Part1', prS: 0, ocM: ''},
    {code: '1', label: 'label1', opG: 'Xarid', prG: 'Group1', prtN: 'Part1', prS: 1, ocM: ''},
    {code: '2', label: 'label2', opG: 'Tolid', prG: 'Group1', prtN: 'Part2', prS: 2, ocM: 'tarash1'},
    {code: '3', label: 'label3', opG: 'Tolid', prG: 'Group1', prtN: 'Part3', prS: 3, ocM: 'tarash1'},
    {code: '4', label: 'label2', opG: 'Xarid', prG: 'Group2', prtN: 'Part1', prS: 1, ocM: ''},
    {code: '5', label: 'label5', opG: 'Tolid', prG: 'Group2', prtN: 'Part2', prS: 2, ocM: 'tarash1'},
    {code: '6', label: 'label6', opG: 'Tolid', prG: 'Group2', prtN: 'Part3', prS: 3, ocM: 'tarash1'},
    {code: '7', label: 'label7', opG: 'Xarid', prG: 'Group3', prtN: 'Part1', prS: 1, ocM: ''},
    {code: '8', label: 'label8', opG: 'Tolid', prG: 'Group3', prtN: 'Part2', prS: 2, ocM: 'tarash1'},
    {code: '9', label: 'label9', opG: 'Tolid', prG: 'Group3', prtN: 'Part3', prS: 3, ocM: 'tarash1'},
    {code: '10', label: 'label10', opG: 'Tolid', prG: 'Group4', prtN: 'Part1', prS: 1, ocM: 'tarash2'},
  ];

  export function CreateTree(): TreeItem[] {
    const simple: TreeItem[]= [];
    const opG: Record<string, Record<string, TreeItem[]>> = {};
    let cntr = 0;
    for (let index = 0; index < list.length; index++) {
      const element = list[index];
      if(element)  {
        if(!(element.opG in opG)){
          opG[element.opG] = {};
        }
  
        const str1 = element.opG;
        if(opG[str1] != undefined) {
          if(!(element.prG in opG[str1])){
            opG[str1][element.prG] = [];
          }
  
          if(element.prG in opG[str1]){
            opG[str1][element.prG]?.push({label: element.label, key: cntr++, content: element, icon: 'work_history', body: 'content'});
          }
        }
      }
    }
    for (const [key, value] of Object.entries(opG)) {
      const prGlist: TreeItem[] = [];
      for (const [k1, v1] of Object.entries(value)) {
        if( key == '' && k1 == ''){
          simple.push(...v1)
        } else if( k1 == ''){
          prGlist.push(...v1)
        } else
        prGlist.push({selectable: false, label: k1, children: v1, key: cntr++, icon: 'extension'})
      }if( key != ''){
        simple.push({selectable: false, label: key, children: prGlist, key: cntr++})
      }
      
    }

    return simple;
  }