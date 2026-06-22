function binarySearch(nums, target) {
  let start = 0; 
  let end = nums.length - 1;
  
  while (start <= end) {
    const index = Math.floor((start + end) / 2);
    const value = nums[index];
    
    if (value === target) return index;
    
    if (value < target) {
      start = index + 1;
    } else if (value > target) {
      end = index - 1;
    }
  }
  
  return -1;
}
