import { useBPMSStore } from "./bpms-store";
import type { TreeItem } from "./entities";

  const uBPMS = useBPMSStore();

  export function CreateTree(): TreeItem[] {
    const simple: TreeItem[]= [];
    const opG: Record<string, Record<string, TreeItem[]>> = {};
    let cntr = 1;

    for (let index = 0; index < uBPMS.tasks.length; index++) {
      const element = uBPMS.tasks[index];
      if(element)  {
        if(!(element.grp in opG)){
          opG[element.grp] = {};
        }
  
        const str1 = element.grp;
        if(opG[str1] != undefined) {
          if(!(element.subgroup in opG[str1])){
            opG[str1][element.subgroup] = [];
          }
  
          if(element.subgroup in opG[str1]){
            opG[str1][element.subgroup]?.push({label: element.name, key: cntr++, content: element, icon: 'work_history', body: 'content', type: 3, level: 3});
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
        {
          //v1.push({selectable: false, label: 'new item', key: cntr++, parent: v1});
          prGlist.push({selectable: false, label: k1, children: v1, key: cntr++, icon: 'extension', type: 2, level: 2})
        }
        
      }
      if( key != ''){
        //prGlist.push({selectable: false, label: 'new item', key: cntr++, parent: prGlist})
        simple.push({selectable: false, label: key, children: prGlist, key: cntr++, type: 1, level: 1})
      }
    }
    //simple.push({selectable: false, label: 'new item', key: cntr++, parent: simple})

    return simple;
  }