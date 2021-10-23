// WIP Java recursive implementation of the "coins" problem
public class Main {
    List<List<Integer>> ans = new ArrayList<>();

    public static void main(String[] args) {
        System.out.println("Hello LeetCoder");
        Main m = new Main();
        System.out.println(m.makeChange(4, new int[] { 1, 2, 3 }));
    }

    public List<List<Integer>> makeChange(int amount, int[] coins) {
        Arrays.sort(coins);
        recursive(coins, coins.length - 1, amount, new ArrayList<Integer>());
        return ans;
    }

    public void recursive(int[] coins, int index, int remainingAmount, List<Integer> tempList) {

        if (index < 0 || remainingAmount < 0) {
            return;
        }
        if (remainingAmount == 0) {
            ans.add(new ArrayList<>(tempList));
            return;
        }

        if (remainingAmount >= coins[index]) {
            recursive(coins, index - 1, remainingAmount, new ArrayList<Integer>(tempList));
            tempList.add(coins[index]);
            recursive(coins, index, remainingAmount - coins[index], new ArrayList<Integer>(tempList));
        } else {
            recursive(coins, index - 1, remainingAmount, new ArrayList<Integer>(tempList));
        }

    }
}

// 4 , [1]
// 4, [1] => 1 => TempList,
// 3 [1]

// amount 4, coins [1,2,3] =>
// 3 templist=> [3, ]
// 4 index=> 2(3)

// [1, 1, 1, 1] = 4
// [1, 1, 2] = 4
