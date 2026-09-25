export class BinaryHeap {

    heap = [];
    
    // inserts a new value at the end of the heap and bubbles it up to its correct position
    insert(value) {
        console.log(value);
        this.heap.push(value);
        this.bubbleUp();
    }

    // Returns the total number of items currently in the heap.
    size() {
        return this.heap.length;
    }

    // Returns true if the heap is empty, false otherwise.
    empty(){
        return ( this.size()===0 );
    }

    //using iterative approach
    //1. Starts at the newly added item (index = this.size() - 1).
    //2. Calculates the parent's position using Math.floor((index - 1) / 2).
    //3. Compares element[0] against parent[0].
    //4. If the new element is larger than its parent, it swaps them and continues moving up the tree until the parent is greater or it reaches the root (index = 0).
    bubbleUp() {
        let index = this.size() - 1;

        while (index > 0) {
            let element = this.heap[index],
                parentIndex = Math.floor((index - 1) / 2),
                parent = this.heap[parentIndex];

            if (parent[0] >= element[0]) break;
            this.heap[index] = parent;
            this.heap[parentIndex] = element;
            index = parentIndex
        }
    }

    // Removes and returns the maximum value from the heap, which is always at index 0. It replaces the root with the last element in the heap and then sinks it down to its correct position.
    extractMax() {
        const max = this.heap[0];
        const tmp = this.heap.pop();
        if(!this.empty()) {
            this.heap[0] = tmp;
            this.sinkDown(0);
        }
        return max;
    }

    //using recursive approach
    //1. Starts at the root (index = 0).
    //2. Calculates the left and right children's positions using 2 * index + 1 and 2 * index + 2, respectively.
    //3. Compares the current element with its children and swaps it with the larger child if necessary.
    //4. Continues this process recursively until the current element is larger than both children or it reaches a leaf node.
    sinkDown(index) {

        let left = 2 * index + 1,
            right = 2 * index + 2,
            largest = index;
        const length = this.size();

        if (left < length && this.heap[left][0] > this.heap[largest][0]) {
            largest = left
        }
        if (right < length && this.heap[right][0] > this.heap[largest][0]) {
            largest = right
        }
        // swap
        if (largest !== index) {
            let tmp = this.heap[largest];
            this.heap[largest] = this.heap[index];
            this.heap[index] = tmp;
            this.sinkDown(largest)
        }
    }
}
