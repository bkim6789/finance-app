export const Interview = () => {
  const runInterview = () => {
    const arr1 = [1, 3];
    const arr2 = [5, 6, 7];

    console.log(findMedianNoOverlap(arr2, arr1));
  };

  function hasNoOverlap(arr1, arr2) {
    return (arr1[0] >= arr2[arr2.length - 1] || arr2[0] >= arr1[arr1.length - 1]);
  }

  function findMedianNoOverlap(arr1, arr2) {
    //find which one has the bigger nums
    let biggerNums, smallerNums;
    if (arr1[0] >= arr2[arr2.length - 1]) {
      biggerNums = arr1;
      smallerNums = arr2;
    } else {
      biggerNums = arr2;
      smallerNums = arr1;
    }

    //find which one has more items
    const smallerHasMoreItems = smallerNums.length > biggerNums.length;

    //find if its an even or odd number of items
    const totalNums = smallerNums.length + biggerNums.length;
    const isOddTotal = totalNums % 2;

    if (isOddTotal) { 
      const index = Math.floor(totalNums / 2);
      if (smallerHasMoreItems) {
        return smallerNums[index];
      } else {
        return biggerNums[index - smallerNums.length];
      }
    } else {
      if (smallerHasMoreItems) {

      } else {
        
      }
    }
  }

  return (
    <button onClick={runInterview}>debug</button>
  );
}