export default class Numbers {
    generate_digit = () => Math.floor(Math.random() * 10);
    generate_number_array = (digits) => {
      digits = Math.max(digits, 1);
      const number_array = [];
      var num;
      while ((num = this.generate_digit()) === 0) {}
      number_array[0] = num;
      for (let i = 1; i < digits; i++) number_array.push(this.generate_digit());
      return number_array;
    };
    generate_smaller_number_array = (number_array) => {
      const digits = number_array.length;
      const num = this.arr2num(number_array);
      var smaller_num;
      while (
        (smaller_num = this.arr2num(this.generate_number_array(digits))) >= num
      ) {}
      return this.num2arr(smaller_num, digits);
    };
  
    arr2num = (arr1) => {
      var num = 0;
      arr1.reverse();
      arr1.forEach((number, place_order) => {
        num += number * Math.pow(10, place_order);
      });
      arr1.reverse();
      return num;
    };
  
    num2arr = (num, digits) => {
      const arr_ = [];
      while (num > 0) {
        const without_first_digit = Math.floor(num / 10);
        const with_zero_first_digit = without_first_digit * 10;
        let first_digit = num - with_zero_first_digit;
        num = without_first_digit;
        arr_.push(first_digit);
      }
      if (digits > arr_.length) {
        const paddings = digits - arr_.length;
        for (let i = 0; i < paddings; i++) {
          arr_.push(0);
        }
      }
      arr_.reverse();
      return arr_;
    };
  }
  