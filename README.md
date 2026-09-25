# Cash Settlement


Windows -> To open this in vs code, right click and choose "Open in Terminal" and type "Code ."
Mac OS -> To open this in vs code, right click on the folder and choose "New Terminal at folder" and type "Code ."

First we will calculate the net amount in an array called vals.
The person receiving the money will inc vals value and person giving the money will dec vals value.

After this we will have the final net amount in positive or negative.
If net amount is positive then it means the person has received more money and will eventually have to give it back
and if the amount is negative then it means the person have given more money and will eventually receive it back.

Now we will store the positive and negative values in the two heaps(max heaps) pos_heap and neg_heap.
and we will take the maximum of both the heaps and will take the minimum among them and that amount will be given from 
the person in the pos_heap to the person in the neg_heap.




================================================================================
                          CASH SETTLEMENT
================================================================================

--------------------------------------------------------------------------------
1. HOW TO OPEN & RUN THE PROJECT
--------------------------------------------------------------------------------
Windows:
  Right-click inside the project folder -> Choose "Open in Terminal" -> Type:
  code .

macOS:
  Right-click on the project folder -> Choose "New Terminal at Folder" -> Type:
  code .

* Note on Running:
  Because the project uses ES Modules (import/export), do NOT open index.html 
  directly via file://. Run it using a local development server (e.g., VS Code's 
  "Live Server" extension, "npx serve", or Python "python -m http.server").


--------------------------------------------------------------------------------
2. CORE ALGORITHM & PROBLEM SETTING (script.js)
--------------------------------------------------------------------------------
Problem Setup:
  - Dynamically generates a network containing between 2 to 9 people (inclusive).
  - Goal: Minimize the total number of cash transfers required to clear all 
    debts across the network.

Step 1: Compute Net Balances
  An array `vals` tracks the net financial position of each person:
  - Receiving money  -> Increases net balance (+ credit)
  - Paying money     -> Decreases net balance (- debt)

Step 2: Balance Interpretation
  - Positive Net Value (> 0): The person received more than they gave. They owe
    money to the group and must PAY IT OUT.
  - Negative Net Value (< 0): The person gave more than they received. They are
    owed money by the group and must RECEIVE IT BACK.

Step 3: Heap Storage Formats
  - `pos_heap` (Max-Heap): Stores creditors as `[credit_amount, person_id]`
  - `neg_heap` (Max-Heap): Stores debtors as `[absolute_debt_amount, person_id]`

Step 4: Greedy Settlement Loop
  Loop until both heaps are empty:
    1. Extract maximum from `pos_heap` (person needing to give the most).
    2. Extract maximum from `neg_heap` (person needing to receive the most).
    3. Transaction Amount: amt = min(pos_max[0], neg_max[0]).
    4. Create direct payment edge: [pos_person] pays [amt] to [neg_person].
    5. Deduct `amt` from both balances.
    6. If either person still has remaining unsettled balance, re-insert them 
       back into their respective heap.

Mathematical Guarantee:
  By greedily clearing at least one person's full debt/credit during each 
  iteration, an N-person network is guaranteed to be fully settled in at 
  most N - 1 transactions.


--------------------------------------------------------------------------------
3. ROLE & WORKING OF MAX-HEAP (heap.js)
--------------------------------------------------------------------------------
What is heap.js?
  `heap.js` implements a Binary Max-Heap using a flat JavaScript Array (`this.heap = []`).

Element Format inside Heap:
  Every entry stored in the heap is a 2-element array: `[amount, person_id]`.
  All internal heap comparisons check index `[0]` to maintain heap order based 
  on the monetary amount.

Time Complexity:
  - `extractMax()`: O(log N) time
  - `insert()`    : O(log N) time
  
  Using a Max-Heap allows us to instantly retrieve the person with the largest 
  credit or debt in logarithmic time O(log N) instead of performing a linear 
  scan O(N) across all participants.

Array Index Math:
  For any element at array index `i`:
  - Parent Index     = Math.floor((i - 1) / 2)
  - Left Child Index  = 2 * i + 1
  - Right Child Index = 2 * i + 2

Key Heap Methods:
  - insert(value):
      Pushes `[amount, person_id]` to the end of the array and calls `bubbleUp()`.
  - bubbleUp():
      Iteratively swaps the newly inserted node with its parent if the node's 
      amount is larger than its parent's amount.
  - extractMax():
      Removes and returns the root element `[max_amount, person_id]`. Places the 
      last array element at the root and calls `sinkDown(0)`.
  - sinkDown(index):
      Recursively compares the root node with its children, swapping it with the 
      larger child until the Max-Heap property is restored.
  - size() / empty():
      Helper functions to monitor heap length and status.
================================================================================
