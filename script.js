import { BinaryHeap } from './heap.js';

onload = function () {
    let curr_data;
    const container = document.getElementById('mynetwork');
    const container2 = document.getElementById('mynetwork2');
    const genNew = document.getElementById('generate-graph');
    const solve = document.getElementById('solve');
    const temptext = document.getElementById('temptext');

    const options = {
        edges: {
            arrows: {
                to: true
            },
            labelHighlightBold: true,
            font: {
                size: 20
            }
        },
        nodes: {
            font: '12px arial red',
            scaling: {
                label: true
            },
            shape: 'icon',
            icon: {
                face: "'Font Awesome 5 Free'", // FA 5+ exact font family name
                code: '\uf183',
                size: 50,
                color: '#991133',
                weight: '900' // Required for solid icons
            }
        },
        interaction: {
            zoomView: false
        }
    };

    let network = new vis.Network(container);
    network.setOptions(options);
    let network2 = new vis.Network(container2);
    network2.setOptions(options);

    function createData(){
        const sz = Math.floor(Math.random() * 8) + 2;

        let nodes = [];
        for(let i=1; i<=sz; i++){
            nodes.push({id: i, label: "Person " + i});
        }
        nodes = new vis.DataSet(nodes);

        const edges = [];
        for(let i=1; i<=sz; i++){
            for(let j=i+1; j<=sz; j++){
                if(Math.random() > 0.5){
                    if(Math.random() > 0.5)
                        edges.push({from: i, to: j, label: String(Math.floor(Math.random()*100)+1)});
                    else
                        edges.push({from: j, to: i, label: String(Math.floor(Math.random()*100)+1)});
                }
            }
        }
        return {
            nodes: nodes,
            edges: edges
        };
    }

    genNew.onclick = function () {
        const data = createData();
        curr_data = data;
        network.setData(data);
        temptext.style.display = "inline";
        container2.style.display = "none";
    };

    solve.onclick = function () {
        temptext.style.display  = "none";
        container2.style.display = "inline";
        const solvedData = solveData();
        network2.setData(solvedData);
    };

    function solveData() {
        let data = curr_data;
        const sz = data['nodes'].length;
        const vals = Array(sz).fill(0);

        for(let i=0; i<data['edges'].length; i++) {
            const edge = data['edges'][i];
            vals[edge['to'] - 1] += parseInt(edge['label']);
            vals[edge['from'] - 1] -= parseInt(edge['label']);
        }

        const pos_heap = new BinaryHeap();
        const neg_heap = new BinaryHeap();

        for(let i=0; i<sz; i++){
            if(vals[i] > 0){
                pos_heap.insert([vals[i], i]);
            } else {
                neg_heap.insert([-vals[i], i]);
                vals[i] *= -1;
            }
        }

        const new_edges = [];
        while(!pos_heap.empty() && !neg_heap.empty()){
            const mx = pos_heap.extractMax();
            const mn = neg_heap.extractMax();

            const amt = Math.min(mx[0], mn[0]);
            const to = mn[1];
            const from = mx[1];

            new_edges.push({from: from+1, to: to+1, label: String(Math.abs(amt))});
            vals[to] -= amt;
            vals[from] -= amt;

            if(mx[0] > mn[0]){
                pos_heap.insert([vals[from], from]);
            } else if(mx[0] < mn[0]){
                neg_heap.insert([vals[to], to]);
            }
        }

        return {
            nodes: data['nodes'],
            edges: new_edges
        };
    }

    // Explicitly wait until the exact Font Awesome glyph is ready in memory
    document.fonts.load('900 50px "Font Awesome 5 Free"').then(function () {
        genNew.click();
    });
};
