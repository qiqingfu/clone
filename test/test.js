/**
 * @author qiqingfu
 * @date 2019-12-14 20:50
 */

/**
 * extend 方法测试文件
 */

const extend = require('../index')

test(
  '简单的浅合并, 两个参数, 第一个参数为目标对象, 第二个参数为源对象',
  () => {
    const target = {}
    const obj = {
      v1: 1,
      v2: null,
      v3: undefined,
      v4: 4
    }

    expect(extend(target, obj)).toEqual({
      v1: 1,
      v2: null,
      v4: 4
    })
  }
)

test(
  '简单的浅合并, 三个参数, 第一个参数为null, 第二、三个参数为源对象, 测试是否自动初始化目标对象',
  () => {
    const obj1 = {
      v1: undefined,
      v2: 2,
      v3: false
    }

    const obj2 = {
      v1: 'o2-v1',
      v4: 4,
      v5: {}
    }

    expect(extend(null, obj1, obj2)).toEqual({
      v1: 'o2-v1',
      v2: 2,
      v3: false,
      v4: 4,
      v5: {}
    })
  }
)

test(
  '测试深度合并, 第一个参数为 true, 第二个参数为目标对象,自身携带一些属性。第三个参数为源对象',
  () => {
    const deepClone = true
    const target = {
      v1: 1,
      v2: {
        v2_1: 'v2_1',
        v2_2: undefined
      },
      v3: [],
      v4: [1, 2, 3, 4, 5]
    }

    const obj = {
      v2: {
        v2_1: 'o-v2_1',
        v2_3: 'o-v3_3'
      },
      v4: [2, 3, 4]
    }

    expect(extend(deepClone, target, obj))
      .toEqual({
        v1: 1,
        v2: {
          v2_1: 'o-v2_1',
          v2_3: 'o-v3_3'
        },
        v3: [],
        v4: [2, 3, 4, 4, 5]
      })
  }
)
