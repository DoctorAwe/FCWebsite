const createUniqueIdGenerator = () => {
  let idCounter = 0;

  return () => {
    idCounter += 1;
    return idCounter.toString(); // 将数字ID转换为字符串
  };
};

module.exports = createUniqueIdGenerator;