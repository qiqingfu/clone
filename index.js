/**
 * @author qiqingfu
 * @date 2019-12-12 22:09
 */

/**
 * 简单版的深度克隆
 */

/**
 * true 深度克隆
 * target 目标对象
 * obj1   源对象
 * obj2   源对象
 * ...
 */

const toString = Object.prototype.toString
const hasOwn = Object.prototype.hasOwnProperty

function isArray (arr) {
  if (typeof Array.isArray === 'function') {
    return Array.isArray(arr)
  }

  return toString.call(arr) === '[object Array]'
}

/**
 * obj 是否为一个 "普通" 函数
 * @param obj
 */
function isPlanObject (obj) {
  if (!obj || toString.call(obj) !== '[object Object]') {
    return false
  }

  /**
   * 确保不是构造函数构造出来的对象实例
   * 1. 判断当前对象的 constructor 属性是自身的还是继承而来的, 如果为普通对象, 则属性constructor 是继承的构造器原型对象上的属性
   * 2. 如果 obj 对象是通过 new 操作符构造出的实力对象, 则 obj.constructor.prototype是构造器的原型对象
   *    而构造器的原型对象自身是没有 isPrototypeOf 属性的。则会返回 false
   */
  const hasConstructor = hasOwn.call(obj, 'constructor')
  const hasIsPrototypeOf = obj.constructor && obj.constructor.prototype && hasOwn.call(obj.constructor.prototype, 'isPrototypeOf')

  if (obj.constructor && !hasConstructor && !hasIsPrototypeOf) {
    return false
  }

  let key
  for (key in obj) { /*  */ }

  return typeof key === 'undefined' || hasOwn.call(obj, key)
}

/**
 * @description 根据 key 获取对象的 val 值, 不处理key 等于 __proto__ 的情况
 * @param obj
 * @param key
 * @returns {*}
 */
function getProperty (obj, key) {
  return obj[key]
}

/**
 * 给一个对象设置值
 * @param obj {Object}
 * @param options {Object}
 * @return {Object}
 */
function setProperty (obj, options) {
  const o = obj
  o[options.k] = options.v

  return o
}

function extend (...rest) {
  let target
  let options
  let i
  let key
  let targetVal
  let copy
  let isArr
  let clone
  let deep

  const args = Array.prototype.slice.call(rest)
  const len = args.length

  target = args[0]
  i = 1
  deep = false

  /**
   * 如果第一个参数为 boolean, 说明可能是深度克隆
   * 目标对象和 i 源对象下标全部向后移动一位
   */
  if (typeof target === 'boolean') {
    deep = target
    target = args[1]
    i = 2
  }

  /**
   * 目标对象初始化
   */
  if (target === null && (!isPlanObject(target) || typeof target !== 'function')) {
    target = {}
  }

  for (; i < len; ++i) {
    options = args[i]
    if (options !== null) {
      for (key in options) {
        if (hasOwn.call(options, key)) {
          targetVal = getProperty(target, key)
          copy = getProperty(options, key)

          /**
           * 防止引用死循环
           */
          if (target !== copy) {
            if (deep && copy && (isPlanObject(copy) || (isArr = isArray(copy)))) {
              if (isArr) {
                isArr = false
                clone = targetVal && isArray(targetVal) ? targetVal : []
              } else {
                clone = targetVal && isPlanObject(targetVal) ? targetVal : {}
              }

              setProperty(target, { k: key, v: extend(deep, clone, copy) })
            } else if (copy !== undefined) {
              /**
               * 当条件不满足 deep 深度克隆
               * copy 存在 但是 copy 值不是对象也不是数据
               * 则为浅克隆, 源对象值直接覆盖(如果目标对象存在相同属性)目标对象的值
               * 确保 copy 值不为 undefined
               */
              setProperty(target, { k: key, v: copy })
            }
          }
        }
      }
    }
  }

  return target
}

module.exports = extend
