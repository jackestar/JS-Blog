!function (t) {
  var r = {
  };
  function e(n) {
    if (r[n]) return r[n].exports;
    var i = r[n] = {
      i: n,
      l: !1,
      exports: {
      }
    };
    return t[n].call(i.exports, i, i.exports, e),
    i.l = !0,
    i.exports
  }
  e.m = t,
  e.c = r,
  e.d = function (t, r, n) {
    e.o(t, r) || Object.defineProperty(t, r, {
      enumerable: !0,
      get: n
    })
  },
  e.r = function (t) {
    'undefined' != typeof Symbol && Symbol.toStringTag && Object.defineProperty(t, Symbol.toStringTag, {
      value: 'Module'
    }),
    Object.defineProperty(t, '__esModule', {
      value: !0
    })
  },
  e.t = function (t, r) {
    if (1 & r && (t = e(t)), 8 & r) return t;
    if (4 & r && 'object' == typeof t && t && t.__esModule) return t;
    var n = Object.create(null);
    if (e.r(n), Object.defineProperty(n, 'default', {
      enumerable: !0,
      value: t
    }), 2 & r && 'string' != typeof t) for (var i in t) e.d(n, i, function (r) {
      return t[r]
    }.bind(null, i));
    return n
  },
  e.n = function (t) {
    var r = t && t.__esModule ? function () {
      return t.default
    }
     : function () {
      return t
    };
    return e.d(r, 'a', r),
    r
  },
  e.o = function (t, r) {
    return Object.prototype.hasOwnProperty.call(t, r)
  },
  e.p = '',
  e(e.s = 17)
}([function (t, r, e) {
  t.exports = function () {
    'use strict';
    function t(r) {
      return (t = 'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator ? function (t) {
        return typeof t
      }
       : function (t) {
        return t && 'function' == typeof Symbol && t.constructor === Symbol && t !== Symbol.prototype ? 'symbol' : typeof t
      }) (r)
    }
    function r(t, r) {
      for (var e, n = 0; n < r.length; n++) (e = r[n]).enumerable = e.enumerable || !1,
      e.configurable = !0,
      'value' in e && (e.writable = !0),
      Object.defineProperty(t, e.key, e)
    }
    function e(t, e, n) {
      return e && r(t.prototype, e),
      n && r(t, n),
      t
    }
    function n(t, r) {
      if ('function' != typeof r && null !== r) throw new TypeError('Super expression must either be null or a function');
      t.prototype = Object.create(r && r.prototype, {
        constructor: {
          value: t,
          writable: !0,
          configurable: !0
        }
      }),
      r && o(t, r)
    }
    function i(t) {
      return (i = Object.setPrototypeOf ? Object.getPrototypeOf : function (t) {
        return t.__proto__ || Object.getPrototypeOf(t)
      }) (t)
    }
    function o(t, r) {
      return (o = Object.setPrototypeOf || function (t, r) {
        return t.__proto__ = r,
        t
      }) (t, r)
    }
    function a() {
      if ('undefined' == typeof Reflect || !Reflect.construct) return !1;
      if (Reflect.construct.sham) return !1;
      if ('function' == typeof Proxy) return !0;
      try {
        return Date.prototype.toString.call(Reflect.construct(Date, [
        ], (function () {
        }))),
        !0
      } catch (t) {
        return !1
      }
    }
    function u() {
      return (u = a() ? Reflect.construct : function (t, r, e) {
        var n = [
          null
        ];
        n.push.apply(n, r);
        var i = new (Function.bind.apply(t, n));
        return e && o(i, e.prototype),
        i
      }).apply(null, arguments)
    }
    function s(t) {
      var r = 'function' == typeof Map ? new Map : void 0;
      return (s = function (t) {
        function e() {
          return u(t, arguments, i(this).constructor)
        }
        if (null === t || !function (t) {
          return - 1 !== Function.toString.call(t).indexOf('[native code]')
        }(t)) return t;
        if ('function' != typeof t) throw new TypeError('Super expression must either be null or a function');
        if (void 0 !== r) {
          if (r.has(t)) return r.get(t);
          r.set(t, e)
        }
        return e.prototype = Object.create(t.prototype, {
          constructor: {
            value: e,
            enumerable: !1,
            writable: !0,
            configurable: !0
          }
        }),
        o(e, t)
      }) (t)
    }
    function f(t, r) {
      return !r || 'object' != typeof r && 'function' != typeof r ? function (t) {
        if (void 0 === t) throw new ReferenceError('this hasn\'t been initialised - super() hasn\'t been called');
        return t
      }(t) : r
    }
    function l(t) {
      var r = a();
      return function () {
        var e,
        n = i(t);
        if (r) {
          var o = i(this).constructor;
          e = Reflect.construct(n, arguments, o)
        } else e = n.apply(this, arguments);
        return f(this, e)
      }
    }
    function c(t, r) {
      (null == r || r > t.length) && (r = t.length);
      for (var e = 0, n = Array(r); e < r; e++) n[e] = t[e];
      return n
    }
    function _(t, r) {
      var e;
      if ('undefined' == typeof Symbol || null == t[Symbol.iterator]) {
        if (Array.isArray(t) || (e = function (t, r) {
          if (t) {
            if ('string' == typeof t) return c(t, r);
            var e = Object.prototype.toString.call(t).slice(8, - 1);
            return 'Object' === e && t.constructor && (e = t.constructor.name),
            'Map' === e || 'Set' === e ? Array.from(t) : 'Arguments' === e || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e) ? c(t, r) : void 0
          }
        }(t)) || r && t && 'number' == typeof t.length) {
          e && (t = e);
          var n = 0,
          i = function () {
          };
          return {
            s: i,
            n: function () {
              return n >= t.length ? {
                done: !0
              }
               : {
                done: !1,
                value: t[n++]
              }
            },
            e: function (t) {
              throw t
            },
            f: i
          }
        }
        throw new TypeError('Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.')
      }
      var o,
      a = !0,
      u = !1;
      return {
        s: function () {
          e = t[Symbol.iterator]()
        },
        n: function () {
          var t = e.next();
          return a = t.done,
          t
        },
        e: function (t) {
          u = !0,
          o = t
        },
        f: function () {
          try {
            a || null == e.return || e.return()
          } finally {
            if (u) throw o
          }
        }
      }
    }
    var h = function (r) {
      var i = Math.abs,
      o = Math.max,
      a = Math.imul,
      u = Math.clz32;
      function s(t, r) {
        var e;
        if (function (t, r) {
          if (!(t instanceof r)) throw new TypeError('Cannot call a class as a function')
        }(this, s), t > s.__kMaxLength) throw new RangeError('Maximum BigInt size exceeded');
        return (e = f.call(this, t)).sign = r,
        e
      }
      n(s, r);
      var f = l(s);
      return e(s, [
        {
          key: 'toDebugString',
          value: function () {
            var t,
            r = [
              'BigInt['
            ],
            e = _(this);
            try {
              for (e.s(); !(t = e.n()).done; ) {
                var n = t.value;
                r.push((n ? (n >>> 0).toString(16) : n) + ', ')
              }
            } catch (t) {
              e.e(t)
            } finally {
              e.f()
            }
            return r.push(']'),
            r.join('')
          }
        },
        {
          key: 'toString',
          value: function () {
            var t = 0 < arguments.length && void 0 !== arguments[0] ? arguments[0] : 10;
            if (2 > t || 36 < t) throw new RangeError('toString() radix argument must be between 2 and 36');
            return 0 === this.length ? '0' : 0 == (t & t - 1) ? s.__toStringBasePowerOfTwo(this, t) : s.__toStringGeneric(this, t, !1)
          }
        },
        {
          key: '__copy',
          value: function () {
            for (var t = new s(this.length, this.sign), r = 0; r < this.length; r++) t[r] = this[r];
            return t
          }
        },
        {
          key: '__trim',
          value: function () {
            for (var t = this.length, r = this[t - 1]; 0 === r; ) r = this[--t - 1],
            this.pop();
            return 0 === t && (this.sign = !1),
            this
          }
        },
        {
          key: '__initializeDigits',
          value: function () {
            for (var t = 0; t < this.length; t++) this[t] = 0
          }
        },
        {
          key: '__clzmsd',
          value: function () {
            return u(this[this.length - 1])
          }
        },
        {
          key: '__inplaceMultiplyAdd',
          value: function (t, r, e) {
            e > this.length && (e = this.length);
            for (var n = 65535 & t, i = t >>> 16, o = 0, u = 65535 & r, s = r >>> 16, f = 0; f < e; f++) {
              var l = this.__digit(f),
              c = 65535 & l,
              _ = l >>> 16,
              h = a(c, n),
              g = a(c, i),
              v = a(_, n),
              d = a(_, i),
              p = u + (65535 & h),
              y = s + o + (p >>> 16) + (h >>> 16) + (65535 & g) + (65535 & v);
              o = (u = (g >>> 16) + (v >>> 16) + (65535 & d) + (y >>> 16)) >>> 16,
              u &= 65535,
              s = d >>> 16,
              this.__setDigit(f, 65535 & p | y << 16)
            }
            if (0 !== o || 0 !== u || 0 !== s) throw new Error('bug de implementacion')
          }
        },
        {
          key: '__inplaceAdd',
          value: function (t, r, e) {
            for (var n, i = 0, o = 0; o < e; o++) i = (n = this.__halfDigit(r + o) + t.__halfDigit(o) + i) >>> 16,
            this.__setHalfDigit(r + o, n);
            return i
          }
        },
        {
          key: '__inplaceSub',
          value: function (t, r, e) {
            var n = 0;
            if (1 & r) {
              r >>= 1;
              for (var i = this.__digit(r), o = 65535 & i, a = 0; a < e - 1 >>> 1; a++) {
                var u = t.__digit(a),
                s = (i >>> 16) - (65535 & u) - n;
                n = 1 & s >>> 16,
                this.__setDigit(r + a, s << 16 | 65535 & o),
                n = 1 & (o = (65535 & (i = this.__digit(r + a + 1))) - (u >>> 16) - n) >>> 16
              }
              var f = t.__digit(a),
              l = (i >>> 16) - (65535 & f) - n;
              if (n = 1 & l >>> 16, this.__setDigit(r + a, l << 16 | 65535 & o), r + a + 1 >= this.length) throw new RangeError('out of bounds');
              0 == (1 & e) && (n = 1 & (o = (65535 & (i = this.__digit(r + a + 1))) - (f >>> 16) - n) >>> 16, this.__setDigit(r + t.length, 4294901760 & i | 65535 & o))
            } else {
              r >>= 1;
              for (var c = 0; c < t.length - 1; c++) {
                var _ = this.__digit(r + c),
                h = t.__digit(c),
                g = (65535 & _) - (65535 & h) - n,
                v = (_ >>> 16) - (h >>> 16) - (n = 1 & g >>> 16);
                n = 1 & v >>> 16,
                this.__setDigit(r + c, v << 16 | 65535 & g)
              }
              var d = this.__digit(r + c),
              p = t.__digit(c),
              y = (65535 & d) - (65535 & p) - n;
              n = 1 & y >>> 16;
              var m = 0;
              0 == (1 & e) && (n = 1 & (m = (d >>> 16) - (p >>> 16) - n) >>> 16),
              this.__setDigit(r + c, m << 16 | 65535 & y)
            }
            return n
          }
        },
        {
          key: '__inplaceRightShift',
          value: function (t) {
            if (0 !== t) {
              for (var r, e = this.__digit(0) >>> t, n = this.length - 1, i = 0; i < n; i++) r = this.__digit(i + 1),
              this.__setDigit(i, r << 32 - t | e),
              e = r >>> t;
              this.__setDigit(n, e)
            }
          }
        },
        {
          key: '__digit',
          value: function (t) {
            return this[t]
          }
        },
        {
          key: '__unsignedDigit',
          value: function (t) {
            return this[t] >>> 0
          }
        },
        {
          key: '__setDigit',
          value: function (t, r) {
            this[t] = 0 | r
          }
        },
        {
          key: '__setDigitGrow',
          value: function (t, r) {
            this[t] = 0 | r
          }
        },
        {
          key: '__halfDigitLength',
          value: function () {
            var t = this.length;
            return 65535 >= this.__unsignedDigit(t - 1) ? 2 * t - 1 : 2 * t
          }
        },
        {
          key: '__halfDigit',
          value: function (t) {
            return 65535 & this[t >>> 1] >>> ((1 & t) << 4)
          }
        },
        {
          key: '__setHalfDigit',
          value: function (t, r) {
            var e = t >>> 1,
            n = this.__digit(e),
            i = 1 & t ? 65535 & n | r << 16 : 4294901760 & n | 65535 & r;
            this.__setDigit(e, i)
          }
        }
      ], [
        {
          key: 'BigInt',
          value: function (r) {
            var e = Math.floor,
            n = Number.isFinite;
            if ('number' == typeof r) {
              if (0 === r) return s.__zero();
              if ((0 | r) === r) return 0 > r ? s.__oneDigit( - r, !0) : s.__oneDigit(r, !1);
              if (!n(r) || e(r) !== r) throw new RangeError('The number ' + r + ' cannot be converted to BigInt because it is not an integer');
              return s.__fromDouble(r)
            }
            if ('string' == typeof r) {
              var i = s.__fromString(r);
              if (null === i) throw new SyntaxError('Cannot convert ' + r + ' to a BigInt');
              return i
            }
            if ('boolean' == typeof r) return !0 === r ? s.__oneDigit(1, !1) : s.__zero();
            if ('object' === t(r)) {
              if (r.constructor === s) return r;
              var o = s.__toPrimitive(r);
              return s.BigInt(o)
            }
            throw new TypeError('Cannot convert ' + r + ' to a BigInt')
          }
        },
        {
          key: 'toNumber',
          value: function (t) {
            var r = t.length;
            if (0 === r) return 0;
            if (1 === r) {
              var e = t.__unsignedDigit(0);
              return t.sign ? - e : e
            }
            var n = t.__digit(r - 1),
            i = u(n),
            o = 32 * r - i;
            if (1024 < o) return t.sign ? - 1 / 0 : 1 / 0;
            var a = o - 1,
            f = n,
            l = r - 1,
            c = i + 1,
            _ = 32 === c ? 0 : f << c;
            _ >>>= 12;
            var h = c - 12,
            g = 12 <= c ? 0 : f << 20 + c,
            v = 20 + c;
            0 < h && 0 < l && (l--, _ |= (f = t.__digit(l)) >>> 32 - h, g = f << h, v = h),
            0 < v && 0 < l && (l--, g |= (f = t.__digit(l)) >>> 32 - v, v -= 32);
            var d = s.__decideRounding(t, v, l, f);
            if ((1 === d || 0 === d && 1 == (1 & g)) && 0 == (g = g + 1 >>> 0) && 0 != ++_ >>> 20 && (_ = 0, 1023 < ++a)) return t.sign ? - 1 / 0 : 1 / 0;
            var p = t.sign ? - 2147483648 : 0;
            return a = a + 1023 << 20,
            s.__kBitConversionInts[1] = p | a | _,
            s.__kBitConversionInts[0] = g,
            s.__kBitConversionDouble[0]
          }
        },
        {
          key: 'unaryMinus',
          value: function (t) {
            if (0 === t.length) return t;
            var r = t.__copy();
            return r.sign = !t.sign,
            r
          }
        },
        {
          key: 'bitwiseNot',
          value: function (t) {
            return t.sign ? s.__absoluteSubOne(t).__trim() : s.__absoluteAddOne(t, !0)
          }
        },
        {
          key: 'exponentiate',
          value: function (t, r) {
            if (r.sign) throw new RangeError('Exponent must be positive');
            if (0 === r.length) return s.__oneDigit(1, !1);
            if (0 === t.length) return t;
            if (1 === t.length && 1 === t.__digit(0)) return t.sign && 0 == (1 & r.__digit(0)) ? s.unaryMinus(t) : t;
            if (1 < r.length) throw new RangeError('BigInt too big');
            var e = r.__unsignedDigit(0);
            if (1 === e) return t;
            if (e >= s.__kMaxLengthBits) throw new RangeError('BigInt too big');
            if (1 === t.length && 2 === t.__digit(0)) {
              var n = 1 + (e >>> 5),
              i = new s(n, t.sign && 0 != (1 & e));
              i.__initializeDigits();
              var o = 1 << (31 & e);
              return i.__setDigit(n - 1, o),
              i
            }
            var a = null,
            u = t;
            for (0 != (1 & e) && (a = t), e >>= 1; 0 !== e; e >>= 1) u = s.multiply(u, u),
            0 != (1 & e) && (a = null === a ? u : s.multiply(a, u));
            return a
          }
        },
        {
          key: 'multiply',
          value: function (t, r) {
            if (0 === t.length) return t;
            if (0 === r.length) return r;
            var e = t.length + r.length;
            32 <= t.__clzmsd() + r.__clzmsd() && e--;
            var n = new s(e, t.sign !== r.sign);
            n.__initializeDigits();
            for (var i = 0; i < t.length; i++) s.__multiplyAccumulate(r, t.__digit(i), n, i);
            return n.__trim()
          }
        },
        {
          key: 'divide',
          value: function (t, r) {
            if (0 === r.length) throw new RangeError('Division by zero');
            if (0 > s.__absoluteCompare(t, r)) return s.__zero();
            var e,
            n = t.sign !== r.sign,
            i = r.__unsignedDigit(0);
            if (1 === r.length && 65535 >= i) {
              if (1 === i) return n === t.sign ? t : s.unaryMinus(t);
              e = s.__absoluteDivSmall(t, i, null)
            } else e = s.__absoluteDivLarge(t, r, !0, !1);
            return e.sign = n,
            e.__trim()
          }
        },
        {
          key: 'remainder',
          value: function (t, r) {
            if (0 === r.length) throw new RangeError('Division by zero');
            if (0 > s.__absoluteCompare(t, r)) return t;
            var e = r.__unsignedDigit(0);
            if (1 === r.length && 65535 >= e) {
              if (1 === e) return s.__zero();
              var n = s.__absoluteModSmall(t, e);
              return 0 === n ? s.__zero() : s.__oneDigit(n, t.sign)
            }
            var i = s.__absoluteDivLarge(t, r, !1, !0);
            return i.sign = t.sign,
            i.__trim()
          }
        },
        {
          key: 'add',
          value: function (t, r) {
            var e = t.sign;
            return e === r.sign ? s.__absoluteAdd(t, r, e) : 0 <= s.__absoluteCompare(t, r) ? s.__absoluteSub(t, r, e) : s.__absoluteSub(r, t, !e)
          }
        },
        {
          key: 'subtract',
          value: function (t, r) {
            var e = t.sign;
            return e === r.sign ? 0 <= s.__absoluteCompare(t, r) ? s.__absoluteSub(t, r, e) : s.__absoluteSub(r, t, !e) : s.__absoluteAdd(t, r, e)
          }
        },
        {
          key: 'leftShift',
          value: function (t, r) {
            return 0 === r.length || 0 === t.length ? t : r.sign ? s.__rightShiftByAbsolute(t, r) : s.__leftShiftByAbsolute(t, r)
          }
        },
        {
          key: 'signedRightShift',
          value: function (t, r) {
            return 0 === r.length || 0 === t.length ? t : r.sign ? s.__leftShiftByAbsolute(t, r) : s.__rightShiftByAbsolute(t, r)
          }
        },
        {
          key: 'unsignedRightShift',
          value: function () {
            throw new TypeError('BigInts have no unsigned right shift; use >> instead')
          }
        },
        {
          key: 'lessThan',
          value: function (t, r) {
            return 0 > s.__compareToBigInt(t, r)
          }
        },
        {
          key: 'lessThanOrEqual',
          value: function (t, r) {
            return 0 >= s.__compareToBigInt(t, r)
          }
        },
        {
          key: 'greaterThan',
          value: function (t, r) {
            return 0 < s.__compareToBigInt(t, r)
          }
        },
        {
          key: 'greaterThanOrEqual',
          value: function (t, r) {
            return 0 <= s.__compareToBigInt(t, r)
          }
        },
        {
          key: 'equal',
          value: function (t, r) {
            if (t.sign !== r.sign) return !1;
            if (t.length !== r.length) return !1;
            for (var e = 0; e < t.length; e++) if (t.__digit(e) !== r.__digit(e)) return !1;
            return !0
          }
        },
        {
          key: 'notEqual',
          value: function (t, r) {
            return !s.equal(t, r)
          }
        },
        {
          key: 'bitwiseAnd',
          value: function (t, r) {
            if (!t.sign && !r.sign) return s.__absoluteAnd(t, r).__trim();
            if (t.sign && r.sign) {
              var e = o(t.length, r.length) + 1,
              n = s.__absoluteSubOne(t, e),
              i = s.__absoluteSubOne(r);
              return n = s.__absoluteOr(n, i, n),
              s.__absoluteAddOne(n, !0, n).__trim()
            }
            if (t.sign) {
              var a = [
                r,
                t
              ];
              t = a[0],
              r = a[1]
            }
            return s.__absoluteAndNot(t, s.__absoluteSubOne(r)).__trim()
          }
        },
        {
          key: 'bitwiseXor',
          value: function (t, r) {
            if (!t.sign && !r.sign) return s.__absoluteXor(t, r).__trim();
            if (t.sign && r.sign) {
              var e = o(t.length, r.length),
              n = s.__absoluteSubOne(t, e),
              i = s.__absoluteSubOne(r);
              return s.__absoluteXor(n, i, n).__trim()
            }
            var a = o(t.length, r.length) + 1;
            if (t.sign) {
              var u = [
                r,
                t
              ];
              t = u[0],
              r = u[1]
            }
            var f = s.__absoluteSubOne(r, a);
            return f = s.__absoluteXor(f, t, f),
            s.__absoluteAddOne(f, !0, f).__trim()
          }
        },
        {
          key: 'bitwiseOr',
          value: function (t, r) {
            var e = o(t.length, r.length);
            if (!t.sign && !r.sign) return s.__absoluteOr(t, r).__trim();
            if (t.sign && r.sign) {
              var n = s.__absoluteSubOne(t, e),
              i = s.__absoluteSubOne(r);
              return n = s.__absoluteAnd(n, i, n),
              s.__absoluteAddOne(n, !0, n).__trim()
            }
            if (t.sign) {
              var a = [
                r,
                t
              ];
              t = a[0],
              r = a[1]
            }
            var u = s.__absoluteSubOne(r, e);
            return u = s.__absoluteAndNot(u, t, u),
            s.__absoluteAddOne(u, !0, u).__trim()
          }
        },
        {
          key: 'asIntN',
          value: function (t, r) {
            if (0 === r.length) return r;
            if (0 === t) return s.__zero();
            if (t >= s.__kMaxLengthBits) return r;
            var e = t + 31 >>> 5;
            if (r.length < e) return r;
            var n = r.__unsignedDigit(e - 1),
            i = 1 << (31 & t - 1);
            if (r.length === e && n < i) return r;
            if ((n & i) !== i) return s.__truncateToNBits(t, r);
            if (!r.sign) return s.__truncateAndSubFromPowerOfTwo(t, r, !0);
            if (0 == (n & i - 1)) {
              for (var o = e - 2; 0 <= o; o--) if (0 !== r.__digit(o)) return s.__truncateAndSubFromPowerOfTwo(t, r, !1);
              return r.length === e && n === i ? r : s.__truncateToNBits(t, r)
            }
            return s.__truncateAndSubFromPowerOfTwo(t, r, !1)
          }
        },
        {
          key: 'asUintN',
          value: function (t, r) {
            if (0 === r.length) return r;
            if (0 === t) return s.__zero();
            if (r.sign) {
              if (t > s.__kMaxLengthBits) throw new RangeError('BigInt too big');
              return s.__truncateAndSubFromPowerOfTwo(t, r, !1)
            }
            if (t >= s.__kMaxLengthBits) return r;
            var e = t + 31 >>> 5;
            if (r.length < e) return r;
            var n = 31 & t;
            if (r.length == e) {
              if (0 === n) return r;
              if (0 == r.__digit(e - 1) >>> n) return r
            }
            return s.__truncateToNBits(t, r)
          }
        },
        {
          key: 'ADD',
          value: function (t, r) {
            if (t = s.__toPrimitive(t), r = s.__toPrimitive(r), 'string' == typeof t) return 'string' != typeof r && (r = r.toString()),
            t + r;
            if ('string' == typeof r) return t.toString() + r;
            if (t = s.__toNumeric(t), r = s.__toNumeric(r), s.__isBigInt(t) && s.__isBigInt(r)) return s.add(t, r);
            if ('number' == typeof t && 'number' == typeof r) return t + r;
            throw new TypeError('Cannot mix BigInt and other types, use explicit conversions')
          }
        },
        {
          key: 'LT',
          value: function (t, r) {
            return s.__compare(t, r, 0)
          }
        },
        {
          key: 'LE',
          value: function (t, r) {
            return s.__compare(t, r, 1)
          }
        },
        {
          key: 'GT',
          value: function (t, r) {
            return s.__compare(t, r, 2)
          }
        },
        {
          key: 'GE',
          value: function (t, r) {
            return s.__compare(t, r, 3)
          }
        },
        {
          key: 'EQ',
          value: function (r, e) {
            for (; ; ) {
              if (s.__isBigInt(r)) return s.__isBigInt(e) ? s.equal(r, e) : s.EQ(e, r);
              if ('number' == typeof r) {
                if (s.__isBigInt(e)) return s.__equalToNumber(e, r);
                if ('object' !== t(e)) return r == e;
                e = s.__toPrimitive(e)
              } else if ('string' == typeof r) {
                if (s.__isBigInt(e)) return null !== (r = s.__fromString(r)) && s.equal(r, e);
                if ('object' !== t(e)) return r == e;
                e = s.__toPrimitive(e)
              } else if ('boolean' == typeof r) {
                if (s.__isBigInt(e)) return s.__equalToNumber(e, + r);
                if ('object' !== t(e)) return r == e;
                e = s.__toPrimitive(e)
              } else if ('symbol' === t(r)) {
                if (s.__isBigInt(e)) return !1;
                if ('object' !== t(e)) return r == e;
                e = s.__toPrimitive(e)
              } else {
                if ('object' !== t(r)) return r == e;
                if ('object' === t(e) && e.constructor !== s) return r == e;
                r = s.__toPrimitive(r)
              }
            }
          }
        },
        {
          key: 'NE',
          value: function (t, r) {
            return !s.EQ(t, r)
          }
        },
        {
          key: '__zero',
          value: function () {
            return new s(0, !1)
          }
        },
        {
          key: '__oneDigit',
          value: function (t, r) {
            var e = new s(1, r);
            return e.__setDigit(0, t),
            e
          }
        },
        {
          key: '__decideRounding',
          value: function (t, r, e, n) {
            if (0 < r) return - 1;
            var i;
            if (0 > r) i = - r - 1;
             else {
              if (0 === e) return - 1;
              e--,
              n = t.__digit(e),
              i = 31
            }
            var o = 1 << i;
            if (0 == (n & o)) return - 1;
            if (0 != (n & (o -= 1))) return 1;
            for (; 0 < e; ) if (e--, 0 !== t.__digit(e)) return 1;
            return 0
          }
        },
        {
          key: '__fromDouble',
          value: function (t) {
            s.__kBitConversionDouble[0] = t;
            var r,
            e = (2047 & s.__kBitConversionInts[1] >>> 20) - 1023,
            n = 1 + (e >>> 5),
            i = new s(n, 0 > t),
            o = 1048575 & s.__kBitConversionInts[1] | 1048576,
            a = s.__kBitConversionInts[0],
            u = 31 & e,
            f = 0;
            if (u < 20) {
              var l = 20 - u;
              f = l + 32,
              r = o >>> l,
              o = o << 32 - l | a >>> l,
              a <<= 32 - l
            } else if (20 === u) f = 32,
            r = o,
            o = a;
             else {
              var c = u - 20;
              f = 32 - c,
              r = o << c | a >>> 32 - c,
              o = a << c
            }
            i.__setDigit(n - 1, r);
            for (var _ = n - 2; 0 <= _; _--) 0 < f ? (f -= 32, r = o, o = a) : r = 0,
            i.__setDigit(_, r);
            return i.__trim()
          }
        },
        {
          key: '__isWhitespace',
          value: function (t) {
            return !!(13 >= t && 9 <= t) || (159 >= t ? 32 == t : 131071 >= t ? 160 == t || 5760 == t : 196607 >= t ? 10 >= (t &= 131071) || 40 == t || 41 == t || 47 == t || 95 == t || 4096 == t : 65279 == t)
          }
        },
        {
          key: '__fromString',
          value: function (t) {
            var r = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 0,
            e = 0,
            n = t.length,
            i = 0;
            if (i === n) return s.__zero();
            for (var o = t.charCodeAt(i); s.__isWhitespace(o); ) {
              if (++i === n) return s.__zero();
              o = t.charCodeAt(i)
            }
            if (43 === o) {
              if (++i === n) return null;
              o = t.charCodeAt(i),
              e = 1
            } else if (45 === o) {
              if (++i === n) return null;
              o = t.charCodeAt(i),
              e = - 1
            }
            if (0 === r) {
              if (r = 10, 48 === o) {
                if (++i === n) return s.__zero();
                if (88 === (o = t.charCodeAt(i)) || 120 === o) {
                  if (r = 16, ++i === n) return null;
                  o = t.charCodeAt(i)
                } else if (79 === o || 111 === o) {
                  if (r = 8, ++i === n) return null;
                  o = t.charCodeAt(i)
                } else if (66 === o || 98 === o) {
                  if (r = 2, ++i === n) return null;
                  o = t.charCodeAt(i)
                }
              }
            } else if (16 === r && 48 === o) {
              if (++i === n) return s.__zero();
              if (88 === (o = t.charCodeAt(i)) || 120 === o) {
                if (++i === n) return null;
                o = t.charCodeAt(i)
              }
            }
            for (; 48 === o; ) {
              if (++i === n) return s.__zero();
              o = t.charCodeAt(i)
            }
            var a = n - i,
            u = s.__kMaxBitsPerChar[r],
            f = s.__kBitsPerCharTableMultiplier - 1;
            if (a > 1073741824 / u) return null;
            var l = u * a + f >>> s.__kBitsPerCharTableShift,
            c = new s(l + 31 >>> 5, !1),
            _ = 10 > r ? r : 10,
            h = 10 < r ? r - 10 : 0;
            if (0 == (r & r - 1)) {
              u >>= s.__kBitsPerCharTableShift;
              var g = [
              ],
              v = [
              ],
              d = !1;
              do {
                for (var p, y = 0, m = 0; ; ) {
                  if (p = void 0, o - 48 >>> 0 < _) p = o - 48;
                   else {
                    if (!((32 | o) - 97 >>> 0 < h)) {
                      d = !0;
                      break
                    }
                    p = (32 | o) - 87
                  }
                  if (m += u, y = y << u | p, ++i === n) {
                    d = !0;
                    break
                  }
                  if (o = t.charCodeAt(i), 32 < m + u) break
                }
                g.push(y),
                v.push(m)
              } while (!d);
              s.__fillFromParts(c, g, v)
            } else {
              c.__initializeDigits();
              var b = !1,
              w = 0;
              do {
                for (var B, D = 0, A = 1; ; ) {
                  if (B = void 0, o - 48 >>> 0 < _) B = o - 48;
                   else {
                    if (!((32 | o) - 97 >>> 0 < h)) {
                      b = !0;
                      break
                    }
                    B = (32 | o) - 87
                  }
                  var k = A * r;
                  if (4294967295 < k) break;
                  if (A = k, D = D * r + B, w++, ++i === n) {
                    b = !0;
                    break
                  }
                  o = t.charCodeAt(i)
                }
                var S = u * w + (f = 32 * s.__kBitsPerCharTableMultiplier - 1) >>> s.__kBitsPerCharTableShift + 5;
                c.__inplaceMultiplyAdd(A, D, S)
              } while (!b)
            }
            if (i !== n) {
              if (!s.__isWhitespace(o)) return null;
              for (i++; i < n; i++) if (o = t.charCodeAt(i), !s.__isWhitespace(o)) return null
            }
            return 0 !== e && 10 !== r ? null : (c.sign = - 1 === e, c.__trim())
          }
        },
        {
          key: '__fillFromParts',
          value: function (t, r, e) {
            for (var n = 0, i = 0, o = 0, a = r.length - 1; 0 <= a; a--) {
              var u = r[a],
              s = e[a];
              i |= u << o,
              32 === (o += s) ? (t.__setDigit(n++, i), o = 0, i = 0) : 32 < o && (t.__setDigit(n++, i), i = u >>> s - (o -= 32))
            }
            if (0 !== i) {
              if (n >= t.length) throw new Error('bug de implementacion');
              t.__setDigit(n++, i)
            }
            for (; n < t.length; n++) t.__setDigit(n, 0)
          }
        },
        {
          key: '__toStringBasePowerOfTwo',
          value: function (t, r) {
            var e = t.length,
            n = r - 1,
            i = n = (15 & (n = (51 & (n = (85 & n >>> 1) + (85 & n)) >>> 2) + (51 & n)) >>> 4) + (15 & n),
            o = r - 1,
            a = t.__digit(e - 1),
            f = 0 | (32 * e - u(a) + i - 1) / i;
            if (t.sign && f++, 268435456 < f) throw new Error('string too long');
            for (var l = Array(f), c = f - 1, _ = 0, h = 0, g = 0; g < e - 1; g++) {
              var v = t.__digit(g),
              d = (_ | v << h) & o;
              l[c--] = s.__kConversionChars[d];
              var p = i - h;
              for (_ = v >>> p, h = 32 - p; h >= i; ) l[c--] = s.__kConversionChars[_ & o],
              _ >>>= i,
              h -= i
            }
            var y = (_ | a << h) & o;
            for (l[c--] = s.__kConversionChars[y], _ = a >>> i - h; 0 !== _; ) l[c--] = s.__kConversionChars[_ & o],
            _ >>>= i;
            if (t.sign && (l[c--] = '-'), - 1 !== c) throw new Error('bug de implementacion');
            return l.join('')
          }
        },
        {
          key: '__toStringGeneric',
          value: function (t, r, e) {
            var n = t.length;
            if (0 === n) return '';
            if (1 === n) {
              var i = t.__unsignedDigit(0).toString(r);
              return !1 === e && t.sign && (i = '-' + i),
              i
            }
            var o,
            a,
            f = 32 * n - u(t.__digit(n - 1)),
            l = s.__kMaxBitsPerChar[r] - 1,
            c = f * s.__kBitsPerCharTableMultiplier,
            _ = 1 + (c = 0 | (c += l - 1) / l) >> 1,
            h = s.exponentiate(s.__oneDigit(r, !1), s.__oneDigit(_, !1)),
            g = h.__unsignedDigit(0);
            if (1 === h.length && 65535 >= g) {
              (o = new s(t.length, !1)).__initializeDigits();
              for (var v, d = 0, p = 2 * t.length - 1; 0 <= p; p--) v = d << 16 | t.__halfDigit(p),
              o.__setHalfDigit(p, 0 | v / g),
              d = 0 | v % g;
              a = d.toString(r)
            } else {
              var y = s.__absoluteDivLarge(t, h, !0, !0);
              o = y.quotient;
              var m = y.remainder.__trim();
              a = s.__toStringGeneric(m, r, !0)
            }
            o.__trim();
            for (var b = s.__toStringGeneric(o, r, !0); a.length < _; ) a = '0' + a;
            return !1 === e && t.sign && (b = '-' + b),
            b + a
          }
        },
        {
          key: '__unequalSign',
          value: function (t) {
            return t ? - 1 : 1
          }
        },
        {
          key: '__absoluteGreater',
          value: function (t) {
            return t ? - 1 : 1
          }
        },
        {
          key: '__absoluteLess',
          value: function (t) {
            return t ? 1 : - 1
          }
        },
        {
          key: '__compareToBigInt',
          value: function (t, r) {
            var e = t.sign;
            if (e !== r.sign) return s.__unequalSign(e);
            var n = s.__absoluteCompare(t, r);
            return 0 < n ? s.__absoluteGreater(e) : 0 > n ? s.__absoluteLess(e) : 0
          }
        },
        {
          key: '__compareToNumber',
          value: function (t, r) {
            if (!0 | r) {
              var e = t.sign,
              n = 0 > r;
              if (e !== n) return s.__unequalSign(e);
              if (0 === t.length) {
                if (n) throw new Error('bug de implementacion');
                return 0 === r ? 0 : - 1
              }
              if (1 < t.length) return s.__absoluteGreater(e);
              var o = i(r),
              a = t.__unsignedDigit(0);
              return a > o ? s.__absoluteGreater(e) : a < o ? s.__absoluteLess(e) : 0
            }
            return s.__compareToDouble(t, r)
          }
        },
        {
          key: '__compareToDouble',
          value: function (t, r) {
            if (r != r) return r;
            if (r === 1 / 0) return - 1;
            if (r === - 1 / 0) return 1;
            var e = t.sign;
            if (e !== 0 > r) return s.__unequalSign(e);
            if (0 === r) throw new Error('implementation bug: should be handled elsewhere');
            if (0 === t.length) return - 1;
            s.__kBitConversionDouble[0] = r;
            var n = 2047 & s.__kBitConversionInts[1] >>> 20;
            if (2047 == n) throw new Error('implementation bug: handled elsewhere');
            var i = n - 1023;
            if (0 > i) return s.__absoluteGreater(e);
            var o = t.length,
            a = t.__digit(o - 1),
            f = u(a),
            l = 32 * o - f,
            c = i + 1;
            if (l < c) return s.__absoluteLess(e);
            if (l > c) return s.__absoluteGreater(e);
            var _ = 1048576 | 1048575 & s.__kBitConversionInts[1],
            h = s.__kBitConversionInts[0],
            g = 31 - f;
            if (g !== (l - 1) % 31) throw new Error('bug de implementacion');
            var v,
            d = 0;
            if (g < 20) {
              var p = 20 - g;
              d = p + 32,
              v = _ >>> p,
              _ = _ << 32 - p | h >>> p,
              h <<= 32 - p
            } else if (20 === g) d = 32,
            v = _,
            _ = h;
             else {
              var y = g - 20;
              d = 32 - y,
              v = _ << y | h >>> 32 - y,
              _ = h << y
            }
            if ((a >>>= 0) > (v >>>= 0)) return s.__absoluteGreater(e);
            if (a < v) return s.__absoluteLess(e);
            for (var m = o - 2; 0 <= m; m--) {
              0 < d ? (d -= 32, v = _ >>> 0, _ = h, h = 0) : v = 0;
              var b = t.__unsignedDigit(m);
              if (b > v) return s.__absoluteGreater(e);
              if (b < v) return s.__absoluteLess(e)
            }
            if (0 !== _ || 0 !== h) {
              if (0 === d) throw new Error('bug de implementacion');
              return s.__absoluteLess(e)
            }
            return 0
          }
        },
        {
          key: '__equalToNumber',
          value: function (t, r) {
            return r | 0 === r ? 0 === r ? 0 === t.length : 1 === t.length && t.sign === 0 > r && t.__unsignedDigit(0) === i(r) : 0 === s.__compareToDouble(t, r)
          }
        },
        {
          key: '__comparisonResultToBool',
          value: function (t, r) {
            switch (r) {
              case 0:
                return 0 > t;
              case 1:
                return 0 >= t;
              case 2:
                return 0 < t;
              case 3:
                return 0 <= t
            }
            throw new Error('unreachable')
          }
        },
        {
          key: '__compare',
          value: function (t, r, e) {
            if (t = s.__toPrimitive(t), r = s.__toPrimitive(r), 'string' == typeof t && 'string' == typeof r) switch (e) {
              case 0:
                return t < r;
              case 1:
                return t <= r;
              case 2:
                return t > r;
              case 3:
                return t >= r
            }
            if (s.__isBigInt(t) && 'string' == typeof r) return null !== (r = s.__fromString(r)) && s.__comparisonResultToBool(s.__compareToBigInt(t, r), e);
            if ('string' == typeof t && s.__isBigInt(r)) return null !== (t = s.__fromString(t)) && s.__comparisonResultToBool(s.__compareToBigInt(t, r), e);
            if (t = s.__toNumeric(t), r = s.__toNumeric(r), s.__isBigInt(t)) {
              if (s.__isBigInt(r)) return s.__comparisonResultToBool(s.__compareToBigInt(t, r), e);
              if ('number' != typeof r) throw new Error('bug de implementacion');
              return s.__comparisonResultToBool(s.__compareToNumber(t, r), e)
            }
            if ('number' != typeof t) throw new Error('bug de implementacion');
            if (s.__isBigInt(r)) return s.__comparisonResultToBool(s.__compareToNumber(r, t), 2 ^ e);
            if ('number' != typeof r) throw new Error('bug de implementacion');
            return 0 === e ? t < r : 1 === e ? t <= r : 2 === e ? t > r : 3 === e ? t >= r : void 0
          }
        },
        {
          key: '__absoluteAdd',
          value: function (t, r, e) {
            if (t.length < r.length) return s.__absoluteAdd(r, t, e);
            if (0 === t.length) return t;
            if (0 === r.length) return t.sign === e ? t : s.unaryMinus(t);
            var n = t.length;
            (0 === t.__clzmsd() || r.length === t.length && 0 === r.__clzmsd()) && n++;
            for (var i = new s(n, e), o = 0, a = 0; a < r.length; a++) {
              var u = r.__digit(a),
              f = t.__digit(a),
              l = (65535 & f) + (65535 & u) + o,
              c = (f >>> 16) + (u >>> 16) + (l >>> 16);
              o = c >>> 16,
              i.__setDigit(a, 65535 & l | c << 16)
            }
            for (; a < t.length; a++) {
              var _ = t.__digit(a),
              h = (65535 & _) + o,
              g = (_ >>> 16) + (h >>> 16);
              o = g >>> 16,
              i.__setDigit(a, 65535 & h | g << 16)
            }
            return a < i.length && i.__setDigit(a, o),
            i.__trim()
          }
        },
        {
          key: '__absoluteSub',
          value: function (t, r, e) {
            if (0 === t.length) return t;
            if (0 === r.length) return t.sign === e ? t : s.unaryMinus(t);
            for (var n = new s(t.length, e), i = 0, o = 0; o < r.length; o++) {
              var a = t.__digit(o),
              u = r.__digit(o),
              f = (65535 & a) - (65535 & u) - i,
              l = (a >>> 16) - (u >>> 16) - (i = 1 & f >>> 16);
              i = 1 & l >>> 16,
              n.__setDigit(o, 65535 & f | l << 16)
            }
            for (; o < t.length; o++) {
              var c = t.__digit(o),
              _ = (65535 & c) - i,
              h = (c >>> 16) - (i = 1 & _ >>> 16);
              i = 1 & h >>> 16,
              n.__setDigit(o, 65535 & _ | h << 16)
            }
            return n.__trim()
          }
        },
        {
          key: '__absoluteAddOne',
          value: function (t, r) {
            var e = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null,
            n = t.length;
            null === e ? e = new s(n, r) : e.sign = r;
            for (var i, o = !0, a = 0; a < n; a++) {
              if (i = t.__digit(a), o) {
                var u = - 1 === i;
                i = 0 | i + 1,
                o = u
              }
              e.__setDigit(a, i)
            }
            return o && e.__setDigitGrow(n, 1),
            e
          }
        },
        {
          key: '__absoluteSubOne',
          value: function (t, r) {
            for (var e, n = t.length, i = new s(r = r || n, !1), o = !0, a = 0; a < n; a++) {
              if (e = t.__digit(a), o) {
                var u = 0 === e;
                e = 0 | e - 1,
                o = u
              }
              i.__setDigit(a, e)
            }
            if (o) throw new Error('bug de implementacion');
            for (var f = n; f < r; f++) i.__setDigit(f, 0);
            return i
          }
        },
        {
          key: '__absoluteAnd',
          value: function (t, r) {
            var e = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null,
            n = t.length,
            i = r.length,
            o = i;
            if (n < i) {
              o = n;
              var a = t,
              u = n;
              t = r,
              n = i,
              r = a,
              i = u
            }
            var f = o;
            null === e ? e = new s(f, !1) : f = e.length;
            for (var l = 0; l < o; l++) e.__setDigit(l, t.__digit(l) & r.__digit(l));
            for (; l < f; l++) e.__setDigit(l, 0);
            return e
          }
        },
        {
          key: '__absoluteAndNot',
          value: function (t, r) {
            var e = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null,
            n = t.length,
            i = r.length,
            o = i;
            n < i && (o = n);
            var a = n;
            null === e ? e = new s(a, !1) : a = e.length;
            for (var u = 0; u < o; u++) e.__setDigit(u, t.__digit(u) & ~r.__digit(u));
            for (; u < n; u++) e.__setDigit(u, t.__digit(u));
            for (; u < a; u++) e.__setDigit(u, 0);
            return e
          }
        },
        {
          key: '__absoluteOr',
          value: function (t, r) {
            var e = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null,
            n = t.length,
            i = r.length,
            o = i;
            if (n < i) {
              o = n;
              var a = t,
              u = n;
              t = r,
              n = i,
              r = a,
              i = u
            }
            var f = n;
            null === e ? e = new s(f, !1) : f = e.length;
            for (var l = 0; l < o; l++) e.__setDigit(l, t.__digit(l) | r.__digit(l));
            for (; l < n; l++) e.__setDigit(l, t.__digit(l));
            for (; l < f; l++) e.__setDigit(l, 0);
            return e
          }
        },
        {
          key: '__absoluteXor',
          value: function (t, r) {
            var e = 2 < arguments.length && void 0 !== arguments[2] ? arguments[2] : null,
            n = t.length,
            i = r.length,
            o = i;
            if (n < i) {
              o = n;
              var a = t,
              u = n;
              t = r,
              n = i,
              r = a,
              i = u
            }
            var f = n;
            null === e ? e = new s(f, !1) : f = e.length;
            for (var l = 0; l < o; l++) e.__setDigit(l, t.__digit(l) ^ r.__digit(l));
            for (; l < n; l++) e.__setDigit(l, t.__digit(l));
            for (; l < f; l++) e.__setDigit(l, 0);
            return e
          }
        },
        {
          key: '__absoluteCompare',
          value: function (t, r) {
            var e = t.length - r.length;
            if (0 != e) return e;
            for (var n = t.length - 1; 0 <= n && t.__digit(n) === r.__digit(n); ) n--;
            return 0 > n ? 0 : t.__unsignedDigit(n) > r.__unsignedDigit(n) ? 1 : - 1
          }
        },
        {
          key: '__multiplyAccumulate',
          value: function (t, r, e, n) {
            if (0 !== r) {
              for (var i = 65535 & r, o = r >>> 16, u = 0, s = 0, f = 0, l = 0; l < t.length; l++, n++) {
                var c = e.__digit(n),
                _ = 65535 & c,
                h = c >>> 16,
                g = t.__digit(l),
                v = 65535 & g,
                d = g >>> 16,
                p = a(v, i),
                y = a(v, o),
                m = a(d, i),
                b = a(d, o);
                u = (s = (y >>> 16) + (m >>> 16) + (65535 & b) + (u = (h += f + u + ((_ += s + (65535 & p)) >>> 16) + (p >>> 16) + (65535 & y) + (65535 & m)) >>> 16)) >>> 16,
                s &= 65535,
                f = b >>> 16,
                c = 65535 & _ | h << 16,
                e.__setDigit(n, c)
              }
              for (; 0 !== u || 0 !== s || 0 !== f; n++) {
                var w = e.__digit(n),
                B = (65535 & w) + s,
                D = (w >>> 16) + (B >>> 16) + f + u;
                s = 0,
                f = 0,
                u = D >>> 16,
                w = 65535 & B | D << 16,
                e.__setDigit(n, w)
              }
            }
          }
        },
        {
          key: '__internalMultiplyAdd',
          value: function (t, r, e, n, i) {
            for (var o = e, u = 0, s = 0; s < n; s++) {
              var f = t.__digit(s),
              l = a(65535 & f, r),
              c = (65535 & l) + u + o;
              o = c >>> 16;
              var _ = a(f >>> 16, r),
              h = (65535 & _) + (l >>> 16) + o;
              o = h >>> 16,
              u = _ >>> 16,
              i.__setDigit(s, h << 16 | 65535 & c)
            }
            if (i.length > n) for (i.__setDigit(n++, o + u); n < i.length; ) i.__setDigit(n++, 0);
             else if (0 !== o + u) throw new Error('bug de implementacion')
          }
        },
        {
          key: '__absoluteDivSmall',
          value: function (t, r, e) {
            null === e && (e = new s(t.length, !1));
            for (var n = 0, i = 2 * t.length - 1; 0 <= i; i -= 2) {
              var o = (n << 16 | t.__halfDigit(i)) >>> 0,
              a = 0 | o / r,
              u = 0 | (o = ((n = 0 | o % r) << 16 | t.__halfDigit(i - 1)) >>> 0) / r;
              n = 0 | o % r,
              e.__setDigit(i >>> 1, a << 16 | u)
            }
            return e
          }
        },
        {
          key: '__absoluteModSmall',
          value: function (t, r) {
            for (var e = 0, n = 2 * t.length - 1; 0 <= n; n--) e = 0 | ((e << 16 | t.__halfDigit(n)) >>> 0) % r;
            return e
          }
        },
        {
          key: '__absoluteDivLarge',
          value: function (t, r, e, n) {
            var i = r.__halfDigitLength(),
            o = r.length,
            u = t.__halfDigitLength() - i,
            f = null;
            e && (f = new s(u + 2 >>> 1, !1)).__initializeDigits();
            var l = new s(i + 2 >>> 1, !1);
            l.__initializeDigits();
            var c = s.__clz16(r.__halfDigit(i - 1));
            0 < c && (r = s.__specialLeftShift(r, c, 0));
            for (var _ = s.__specialLeftShift(t, c, 1), h = r.__halfDigit(i - 1), g = 0, v = u; 0 <= v; v--) {
              var d = 65535,
              p = _.__halfDigit(v + i);
              if (p !== h) {
                var y = (p << 16 | _.__halfDigit(v + i - 1)) >>> 0;
                d = 0 | y / h;
                for (var m = 0 | y % h, b = r.__halfDigit(i - 2), w = _.__halfDigit(v + i - 2); a(d, b) >>> 0 > (m << 16 | w) >>> 0 && (d--, !(65535 < (m += h))); );
              }
              s.__internalMultiplyAdd(r, d, 0, o, l);
              var B = _.__inplaceSub(l, v, i + 1);
              0 !== B && (B = _.__inplaceAdd(r, v, i), _.__setHalfDigit(v + i, _.__halfDigit(v + i) + B), d--),
              e && (1 & v ? g = d << 16 : f.__setDigit(v >>> 1, g | d))
            }
            return n ? (_.__inplaceRightShift(c), e ? {
              quotient: f,
              remainder: _
            }
             : _) : e ? f : void 0
          }
        },
        {
          key: '__clz16',
          value: function (t) {
            return u(t) - 16
          }
        },
        {
          key: '__specialLeftShift',
          value: function (t, r, e) {
            var n = t.length,
            i = new s(n + e, !1);
            if (0 === r) {
              for (var o = 0; o < n; o++) i.__setDigit(o, t.__digit(o));
              return 0 < e && i.__setDigit(n, 0),
              i
            }
            for (var a, u = 0, f = 0; f < n; f++) a = t.__digit(f),
            i.__setDigit(f, a << r | u),
            u = a >>> 32 - r;
            return 0 < e && i.__setDigit(n, u),
            i
          }
        },
        {
          key: '__leftShiftByAbsolute',
          value: function (t, r) {
            var e = s.__toShiftAmount(r);
            if (0 > e) throw new RangeError('BigInt too big');
            var n = e >>> 5,
            i = 31 & e,
            o = t.length,
            a = 0 !== i && 0 != t.__digit(o - 1) >>> 32 - i,
            u = o + n + (a ? 1 : 0),
            f = new s(u, t.sign);
            if (0 === i) {
              for (var l = 0; l < n; l++) f.__setDigit(l, 0);
              for (; l < u; l++) f.__setDigit(l, t.__digit(l - n))
            } else {
              for (var c = 0, _ = 0; _ < n; _++) f.__setDigit(_, 0);
              for (var h, g = 0; g < o; g++) h = t.__digit(g),
              f.__setDigit(g + n, h << i | c),
              c = h >>> 32 - i;
              if (a) f.__setDigit(o + n, c);
               else if (0 !== c) throw new Error('bug de implementacion')
            }
            return f.__trim()
          }
        },
        {
          key: '__rightShiftByAbsolute',
          value: function (t, r) {
            var e = t.length,
            n = t.sign,
            i = s.__toShiftAmount(r);
            if (0 > i) return s.__rightShiftByMaximum(n);
            var o = i >>> 5,
            a = 31 & i,
            u = e - o;
            if (0 >= u) return s.__rightShiftByMaximum(n);
            var f = !1;
            if (n) if (0 != (t.__digit(o) & (1 << a) - 1)) f = !0;
             else for (var l = 0; l < o; l++) if (0 !== t.__digit(l)) {
              f = !0;
              break
            }
            f && 0 === a && 0 == ~t.__digit(e - 1) && u++;
            var c = new s(u, n);
            if (0 === a) for (var _ = o; _ < e; _++) c.__setDigit(_ - o, t.__digit(_));
             else {
              for (var h, g = t.__digit(o) >>> a, v = e - o - 1, d = 0; d < v; d++) h = t.__digit(d + o + 1),
              c.__setDigit(d, h << 32 - a | g),
              g = h >>> a;
              c.__setDigit(v, g)
            }
            return f && (c = s.__absoluteAddOne(c, !0, c)),
            c.__trim()
          }
        },
        {
          key: '__rightShiftByMaximum',
          value: function (t) {
            return t ? s.__oneDigit(1, !0) : s.__zero()
          }
        },
        {
          key: '__toShiftAmount',
          value: function (t) {
            if (1 < t.length) return - 1;
            var r = t.__unsignedDigit(0);
            return r > s.__kMaxLengthBits ? - 1 : r
          }
        },
        {
          key: '__toPrimitive',
          value: function (r) {
            var e = 1 < arguments.length && void 0 !== arguments[1] ? arguments[1] : 'default';
            if ('object' !== t(r)) return r;
            if (r.constructor === s) return r;
            var n = r[Symbol.toPrimitive];
            if (n) {
              var i = n(e);
              if ('object' !== t(i)) return i;
              throw new TypeError('Cannot convert object to primitive value')
            }
            var o = r.valueOf;
            if (o) {
              var a = o.call(r);
              if ('object' !== t(a)) return a
            }
            var u = r.toString;
            if (u) {
              var f = u.call(r);
              if ('object' !== t(f)) return f
            }
            throw new TypeError('Cannot convert object to primitive value')
          }
        },
        {
          key: '__toNumeric',
          value: function (t) {
            return s.__isBigInt(t) ? t : + t
          }
        },
        {
          key: '__isBigInt',
          value: function (r) {
            return 'object' === t(r) && r.constructor === s
          }
        },
        {
          key: '__truncateToNBits',
          value: function (t, r) {
            for (var e = t + 31 >>> 5, n = new s(e, r.sign), i = e - 1, o = 0; o < i; o++) n.__setDigit(o, r.__digit(o));
            var a = r.__digit(i);
            if (0 != (31 & t)) {
              var u = 32 - (31 & t);
              a = a << u >>> u
            }
            return n.__setDigit(i, a),
            n.__trim()
          }
        },
        {
          key: '__truncateAndSubFromPowerOfTwo',
          value: function (t, r, e) {
            for (var n = Math.min, i = t + 31 >>> 5, o = new s(i, e), a = 0, u = i - 1, f = 0, l = n(u, r.length); a < l; a++) {
              var c = r.__digit(a),
              _ = 0 - (65535 & c) - f,
              h = 0 - (c >>> 16) - (f = 1 & _ >>> 16);
              f = 1 & h >>> 16,
              o.__setDigit(a, 65535 & _ | h << 16)
            }
            for (; a < u; a++) o.__setDigit(a, 0 | - f);
            var g,
            v = u < r.length ? r.__digit(u) : 0,
            d = 31 & t;
            if (0 === d) {
              var p = 0 - (65535 & v) - f;
              g = 65535 & p | 0 - (v >>> 16) - (f = 1 & p >>> 16) << 16
            } else {
              var y = 32 - d,
              m = 1 << 32 - y,
              b = (65535 & m) - (65535 & (v = v << y >>> y)) - f;
              g = 65535 & b | (m >>> 16) - (v >>> 16) - (f = 1 & b >>> 16) << 16,
              g &= m - 1
            }
            return o.__setDigit(u, g),
            o.__trim()
          }
        },
        {
          key: '__digitPow',
          value: function (t, r) {
            for (var e = 1; 0 < r; ) 1 & r && (e *= t),
            r >>>= 1,
            t *= t;
            return e
          }
        }
      ]),
      s
    }(s(Array));
    return h.__kMaxLength = 33554432,
    h.__kMaxLengthBits = h.__kMaxLength << 5,
    h.__kMaxBitsPerChar = [
      0,
      0,
      32,
      51,
      64,
      75,
      83,
      90,
      96,
      102,
      107,
      111,
      115,
      119,
      122,
      126,
      128,
      131,
      134,
      136,
      139,
      141,
      143,
      145,
      147,
      149,
      151,
      153,
      154,
      156,
      158,
      159,
      160,
      162,
      163,
      165,
      166
    ],
    h.__kBitsPerCharTableShift = 5,
    h.__kBitsPerCharTableMultiplier = 1 << h.__kBitsPerCharTableShift,
    h.__kConversionChars = [
      '0',
      '1',
      '2',
      '3',
      '4',
      '5',
      '6',
      '7',
      '8',
      '9',
      'a',
      'b',
      'c',
      'd',
      'e',
      'f',
      'g',
      'h',
      'i',
      'j',
      'k',
      'l',
      'm',
      'n',
      'o',
      'p',
      'q',
      'r',
      's',
      't',
      'u',
      'v',
      'w',
      'x',
      'y',
      'z'
    ],
    h.__kBitConversionBuffer = new ArrayBuffer(8),
    h.__kBitConversionDouble = new Float64Array(h.__kBitConversionBuffer),
    h.__kBitConversionInts = new Int32Array(h.__kBitConversionBuffer),
    h
  }()
},
function (t, r, e) {
  'use strict';
  e.d(r, 'd', (function () {
    return o
  })),
  e.d(r, 'b', (function () {
    return a
  })),
  e.d(r, 'a', (function () {
    return u
  })),
  e.d(r, 'c', (function () {
    return f
  }));
  var n = function (t) {
    var r = 'function' == typeof Symbol && Symbol.iterator,
    e = r && t[r],
    n = 0;
    if (e) return e.call(t);
    if (t && 'number' == typeof t.length) return {
      next: function () {
        return t && n >= t.length && (t = void 0),
        {
          value: t && t[n++],
          done: !t
        }
      }
    };
    throw new TypeError(r ? 'Object is not iterable.' : 'Symbol.iterator is not defined.')
  },
  i = {
    2: '1',
    3: '2',
    4: '3',
    5: '4',
    6: '5',
    7: '6',
    8: '7',
    9: '8',
    10: '9',
    11: '0',
    16: 'q',
    17: 'w',
    18: 'e',
    19: 'r',
    20: 't',
    21: 'y',
    22: 'u',
    23: 'i',
    24: 'o',
    25: 'p',
    30: 'a',
    31: 's',
    32: 'd',
    33: 'f',
    34: 'g',
    35: 'h',
    36: 'j',
    37: 'k',
    38: 'l',
    44: 'z',
    45: 'x',
    46: 'c',
    47: 'v',
    48: 'b',
    49: 'n',
    50: 'm'
  };
  var o = function () {
    var t = {
    };
    for (var r in i) i.hasOwnProperty(r) && (t[i[r]] = parseInt(r, 10));
    return t
  }();
  function a(t) {
    var r,
    e,
    o = '';
    try {
      for (var a = n(t), u = a.next(); !u.done; u = a.next()) {
        var s = u.value;
        if (0 === s) return o;
        if (!(s in i)) return '';
        o += i[s]
      }
    } catch (t) {
      r = {
        error: t
      }
    } finally {
      try {
        u && !u.done && (e = a.return) && e.call(a)
      } finally {
        if (r) throw r.error
      }
    }
    return o
  }
  function u(t) {
    return t.split('').map((function (t) {
      var r = o[t];
      if (void 0 === r) throw new Error('Undefined scan code');
      return r
    }))
  }
  function s(t) {
    return t.trim().replace(/-/gi, '')
  }
  function f(t) {
    var r = function (e) {
      var n = r.cleaner(e);
      return t.inputValidator(n) ? t.fun(n) : [
      ]
    };
    return r.biosName = t.name,
    r.validator = t.inputValidator,
    t.cleaner ? r.cleaner = t.cleaner : r.cleaner = s,
    r.keygen = t.fun,
    t.examples && (r.examples = t.examples),
    t.description && (r.description = t.description),
    r
  }
},
function (t, r, e) {
  'use strict';
  e.d(r, 'g', (function () {
    return l
  })),
  e.d(r, 'f', (function () {
    return c
  })),
  e.d(r, 'd', (function () {
    return _
  })),
  e.d(r, 'a', (function () {
    return h
  })),
  e.d(r, 'b', (function () {
    return g
  })),
  e.d(r, 'c', (function () {
    return v
  })),
  e.d(r, 'e', (function () {
    return d
  }));
  var n = e(1),
  i = '123456789'.split(''),
  o = 'abcdefghijklmnopqrstuvwxyz'.split(''),
  a = {
    shift: 0,
    salt: 0,
    dictionary: o,
    minLen: 3,
    maxLen: 7
  };
  function u(t, r, e, n) {
    n--;
    for (var i = r, o = 0; o < t.length; o++) {
      i ^= t[o];
      for (var a = 8; a--; ) 1 & i ? i = i >> 1 ^ 8193 : i >>= 1;
      if (o >= n && i === e) return o + 1
    }
    return - 1
  }
  function s(t, r) {
    void 0 === r && (r = o);
    for (var e = Math.random() * r.length, i = 0; i < t.length; i++) {
      var a = Math.floor(e % r.length);
      t[i] = n.d[r[a]],
      e *= t.length
    }
  }
  function f(t) {
    for (var r in void 0 === t && (t = {
    }), a) void 0 === t[r] && (t[r] = a[r]);
    var e = {
      shift: t.shift,
      salt: t.salt,
      dictionary: t.dictionary,
      minLen: t.minLen,
      maxLen: t.maxLen
    },
    i = function (t) {
      var r = function (t, r, e, i, a) {
        void 0 === r && (r = 0),
        void 0 === e && (e = o),
        void 0 === i && (i = 3),
        void 0 === a && (a = 7);
        for (var f = [
        ], l = 0; l < a; l++) f.push(0);
        if (t > 16383) return 0;
        for (var c = 0; ; ) {
          if (++c > 7000000) return 1;
          s(f, e);
          var _ = u(f, r, t, i);
          if ( - 1 !== _) return Object(n.b) (f.slice(0, _))
        }
      }(parseInt(t, 10) + e.shift, e.salt, e.dictionary, e.minLen, e.maxLen);
      return 'string' == typeof r ? [
        r
      ] : [
      ]
    },
    f = function (t) {
      return t.trim().replace(/[-\s]/gi, '')
    },
    l = function (t) {
      return /^[0-9]{5}$/i.test(t)
    },
    c = function (t) {
      var r = f(t);
      return l(r) ? i(r) : [
      ]
    };
    return c.biosName = t.name,
    c.validator = l,
    c.cleaner = f,
    c.keygen = i,
    c.examples = [
      '12345'
    ],
    c.info = e,
    c.calculateHash = function (t) {
      return function (t, r) {
        void 0 === r && (r = 0);
        for (var e = r, n = 0; n < t.length; n++) {
          e ^= t[n];
          for (var i = 8; i--; ) 1 & e ? e = e >> 1 ^ 8193 : e >>= 1
        }
        return e
      }(Object(n.a) (t), e.salt) - e.shift
    },
    t.description && (c.description = t.description),
    c
  }
  var l = f({
    name: 'phoenix',
    description: 'Generico Phoenix'
  }),
  c = f({
    name: 'phoenixHP',
    description: 'HP/Compaq Phoenix BIOS',
    salt: 17232
  }),
  _ = f({
    name: 'phoenixFSI',
    description: 'Fujitsu-Siemens Phoenix',
    salt: 65,
    dictionary: i
  }),
  h = f({
    name: 'phoenixFSIModelL',
    description: 'Fujitsu-Siemens (modelo L) Phoenix',
    shift: 1,
    salt: 'L'.charCodeAt(0),
    dictionary: i
  }),
  g = f({
    name: 'phoenixFSIModelP',
    description: 'Fujitsu-Siemens (modelo P) Phoenix',
    shift: 1,
    salt: 'P'.charCodeAt(0),
    dictionary: i
  }),
  v = f({
    name: 'phoenixFSIModelS',
    description: 'Fujitsu-Siemens (modelo S) Phoenix',
    shift: 1,
    salt: 'S'.charCodeAt(0),
    dictionary: i
  }),
  d = f({
    name: 'phoenixFSIModelX',
    description: 'Fujitsu-Siemens (modelo X) Phoenix',
    shift: 1,
    salt: 'X'.charCodeAt(0),
    dictionary: i
  })
},
function (t, r, e) {
  'use strict';
  var n;
  e.d(r, 'a', (function () {
    return n
  })),
  function (t) {
    t.Tag595B = '595B',
    t.TagD35B = 'D35B',
    t.Tag2A7B = '2A7B',
    t.TagA95B = 'A95B',
    t.Tag1D3B = '1D3B',
    t.Tag6FF1 = '6FF1',
    t.Tag1F66 = '1F66',
    t.Tag1F5A = '1F5A',
    t.TagBF97 = 'BF97'
  }(n || (n = {
  }))
},
function (t, r, e) {
  'use strict';
  e.d(r, 'd', (function () {
    return g
  })),
  e.d(r, 'c', (function () {
    return v
  })),
  e.d(r, 'a', (function () {
    return d
  })),
  e.d(r, 'b', (function () {
    return y
  }));
  var n = e(1),
  i = e(13),
  o = e(6),
  a = e(3),
  u = '\x001234567890-=\tqwertyuiop[]\rÿasdfghjkl;\'`ÿ\\zxcvbnm,./',
  s = [
    5,
    16,
    19,
    9,
    50,
    3,
    37,
    17,
    31,
    23,
    6,
    21,
    48,
    25,
    38,
    34,
    10,
    2,
    44,
    47,
    22,
    20,
    7,
    24,
    36,
    35,
    49,
    32,
    30,
    8,
    45,
    33,
    4,
    11,
    18,
    46
  ],
  f = '012345679abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ0',
  l = {
    '2A7B': f,
    '1F5A': f,
    '1D3B': '0BfIUG1kuPvc8A9Nl5DLZYSno7Ka6HMgqsJWm65yCQR94b21OTp7VFX2z0jihE33d4xtrew0',
    '1F66': '0ewr3d4xtUG1ku0BfIp7VFb21OTSno7KDLZYqsJWa6HMgCQR94m65y9Nl5Pvc8AjihE3X2z0',
    '6FF1': '08rptBxfbGVMz38IiSoeb360MKcLf4QtBCbWVzmH5wmZUcRR5DZG2xNCEv1nFtzsZB2bw1X0',
    BF97: '0Q2drGk99rkQFMxN[Z5y3DGr16h638myIL2rzz2pzcU7JWLJ1EGnqRN4seZPRM2aBXIjbkGZ'
  };
  function c(t) {
    var r = t.split('').map((function (t) {
      return t.charCodeAt(0)
    })),
    e = [
      49,
      49,
      49,
      49,
      49
    ];
    e.push(r[1] >> 1),
    e.push(r[1] >> 6 | r[0] << 2),
    e.push(r[0] >> 3);
    for (var n = 0; n < 8; n++) {
      var i = 170;
      8 & e[n] && (i ^= r[1]),
      16 & e[n] && (i ^= r[0]),
      e[n] = s[i % s.length]
    }
    return e.map((function (t) {
      return u.charAt(t)
    })).join('')
  }
  function _(t, r, e) {
    var n;
    n = r === a.a.TagA95B ? 0 === e ? t + a.a.Tag595B : t.slice(3) + '\x00\x00\x00' + a.a.Tag595B : t + r;
    for (var o = [
    ], f = 0; f < n.length; f++) o.push(n.charCodeAt(f));
    var c,
    _;
    (o = o.concat(function (t, r, e) {
      var n,
      i,
      o,
      a = [
      ];
      0 === e ? (i = [
        1,
        2,
        3,
        4
      ], o = [
        4,
        3,
        2
      ]) : (i = [
        1,
        10,
        9,
        8
      ], o = [
        8,
        9,
        10
      ]),
      a[0] = t[i[3]],
      a[1] = t[i[3]] >> 5 | 241 & (t[i[2]] >> 5 | t[i[2]] << 3),
      a[2] = t[i[2]] >> 2,
      a[3] = t[i[2]] >> 7 | t[i[1]] << 1,
      a[4] = t[i[1]] >> 4 | t[i[0]] << 4,
      a[5] = t[1] >> 1,
      a[6] = t[1] >> 6 | t[0] << 2,
      a[7] = t[0] >> 3,
      a.forEach((function (t, r) {
        a[r] = 255 & t
      }));
      var u = l[r];
      n = void 0 !== u ? u.split('').map((function (t) {
        return t.charCodeAt(0)
      })) : s;
      for (var f = 0; f < 8; f++) {
        var c = 170;
        1 & a[f] && (c ^= t[o[0]]),
        2 & a[f] && (c ^= t[o[1]]),
        4 & a[f] && (c ^= t[o[2]]),
        8 & a[f] && (c ^= t[1]),
        16 & a[f] && (c ^= t[0]),
        a[f] = n[c % n.length]
      }
      return a
    }(o, r, e))) [23] = 128;
    var h = function (t) {
      for (var r = t.length >> 2, e = [
      ], n = 0; n <= r; n++) e[n] = t[4 * n] | t[4 * n + 1] << 8 | t[4 * n + 2] << 16 | t[4 * n + 3] << 24 | 0;
      return e
    }(o);
    for (f = 0; f < 16; f++) void 0 === h[f] && (h[f] = 0);
    return h[14] = 184,
    function (t, r) {
      for (var e = t[0] % 9, n = '', i = l[r], o = 0; o < 16; o++) void 0 !== i ? n += i.charAt(t[o] % i.length) : e <= o && n.length < 8 && (n += u.charAt(s[t[o] % s.length]));
      return n
    }((c = Object(i.a) (h, r), _ = [
    ], c.forEach((function (t) {
      _.push(255 & t),
      _.push(t >> 8 & 255),
      _.push(t >> 16 & 255),
      _.push(t >> 24 & 255)
    })), _), r)
  }
  function h(t) {
    for (var r in t = t.toUpperCase(), a.a) if (t === a.a[r]) return !0;
    return !1
  }
  var g = Object(n.c) ({
    name: 'dellHDDOld',
    description: 'Dell HDD Numero Serial (Viejo)',
    examples: [
      '12345678901'
    ],
    inputValidator: function (t) {
      return 11 === t.length
    },
    fun: function (t) {
      return [c(t)]
    }
  }),
  v = Object(n.c) ({
    name: 'dellTag',
    description: 'Dell Del Numero Serial',
    examples: [
      '1234567-595B',
      '1234567-1D3B'
    ],
    inputValidator: function (t) {
      return 11 === t.length && h(t.slice(7, 11))
    },
    fun: function (t) {
      var r = t.slice(7, 11).toUpperCase();
      return [_(t.slice(0, 7), r, 0)]
    }
  }),
  d = Object(n.c) ({
    name: 'dellHddNew',
    description: 'Dell del serial del hdd',
    examples: [
      '1234567890A-595B'
    ],
    inputValidator: function (t) {
      return 15 === t.length && h(t.slice(11, 15))
    },
    fun: function (t) {
      var r = t.slice(11, 15).toUpperCase();
      return [_(t.slice(0, 11), r, 1)]
    }
  }),
  p = /^([0-9A-F]{16})([0-9A-Z]{7})$/i,
  y = Object(n.c) ({
    name: 'dellLatitude3540',
    description: 'Dell Latitude 3540',
    examples: [
      '5F3988D5E0ACE4BF-7QH8602'
    ],
    inputValidator: function (t) {
      return p.test(t)
    },
    fun: function (t) {
      var r = p.exec(t);
      if (r && 3 === r.length) {
        var e = Object(o.a) (r[1], r[2]);
        if (e) return [e]
      }
      return []
    }
  })
},
function (t, r, e) {
  'use strict';
  e.d(r, 'd', (function () {
    return l
  })),
  e.d(r, 'a', (function () {
    return c
  })),
  e.d(r, 'b', (function () {
    return _
  })),
  e.d(r, 'c', (function () {
    return h
  }));
  var n = e(1),
  i = function (t) {
    var r = 'function' == typeof Symbol && Symbol.iterator,
    e = r && t[r],
    n = 0;
    if (e) return e.call(t);
    if (t && 'number' == typeof t.length) return {
      next: function () {
        return t && n >= t.length && (t = void 0),
        {
          value: t && t[n++],
          done: !t
        }
      }
    };
    throw new TypeError(r ? 'Object is not iterable.' : 'Symbol.iterator is not defined.')
  },
  o = function (t, r) {
    var e = 'function' == typeof Symbol && t[Symbol.iterator];
    if (!e) return t;
    var n,
    i,
    o = e.call(t),
    a = [
    ];
    try {
      for (; (void 0 === r || r-- > 0) && !(n = o.next()).done; ) a.push(n.value)
    } catch (t) {
      i = {
        error: t
      }
    } finally {
      try {
        n && !n.done && (e = o.return) && e.call(o)
      } finally {
        if (i) throw i.error
      }
    }
    return a
  };
  var a = function () {
    for (var t = [
    ], r = 0, e = 0; r < 256; r++) {
      e = r << 8;
      for (var n = 0; n < 8; n++) 65536 & (e <<= 1) && (e ^= 4129);
      t.push(65535 & e)
    }
    return t
  }();
  function u(t) {
    function r(t) {
      var r = '0'.charCodeAt(0);
      return [12,
      8,
      4,
      0].reduce((function (e, n) {
        return e + String.fromCharCode(r + (t >> n) % 16 % 10)
      }), '')
    }
    function e(t, r) {
      for (var e = 0, n = 0; n < t.length; n++) e = 65535 & (e << 8 ^ r[(t.charCodeAt(n) ^ e >> 8) % 256]);
      return e
    }
    return 20 === t.length && (t = t.slice(12, 20)),
    r(e(t.slice(0, 4), a)) + r(e(t.slice(4, 8), a))
  }
  function s(t) {
    var r,
    e,
    n = [
      parseInt(t.slice(0, 5), 10),
      parseInt(t.slice(5, 10), 10),
      parseInt(t.slice(10, 15), 10),
      parseInt(t.slice(15, 20), 10)
    ],
    o = [
    ];
    try {
      for (var a = i(n), u = a.next(); !u.done; u = a.next()) {
        var s = u.value;
        o.push(s % 256),
        o.push(Math.floor(s / 256))
      }
    } catch (t) {
      r = {
        error: t
      }
    } finally {
      try {
        u && !u.done && (e = a.return) && e.call(a)
      } finally {
        if (r) throw r.error
      }
    }
    return o
  }
  function f(t) {
    function r(t, r, e) {
      var n = t.slice(0);
      return n[r[0]] = 255 & (t[e[0]] >> 4 | t[e[3]] << 4),
      n[r[1]] = 15 & t[e[0]] | 240 & t[e[3]],
      n[r[2]] = t[e[1]] >> 4 | t[e[2]] << 4 & 255,
      n[r[3]] = 15 & t[e[1]] | 240 & t[e[2]],
      n
    }
    return (e = s(t)).forEach((function (t, r, e) {
      e[r] = t ^ ':3-v@e4i'.charCodeAt(r)
    })),
    n = o([e[6],
    e[2]], 2),
    e[2] = n[0],
    e[6] = n[1],
    i = o([e[7],
    e[3]], 2),
    e[3] = i[0],
    e[7] = i[1],
    e = r(e, [
      0,
      1,
      2,
      3
    ], [
      0,
      1,
      2,
      3
    ]),
    (e = r(e, [
      4,
      5,
      6,
      7
    ], [
      6,
      7,
      4,
      5
    ])) [0] = e[0] << 3 & 255 | e[0] >> 5,
    e[1] = e[1] << 5 & 255 | e[1] >> 3,
    e[2] = e[2] << 7 & 255 | e[2] >> 1,
    e[3] = e[3] << 4 & 255 | e[3] >> 4,
    e[5] = e[5] << 6 & 255 | e[5] >> 2,
    e[6] = e[6] << 1 & 255 | e[6] >> 7,
    e[7] = e[7] << 2 & 255 | e[7] >> 6,
    e.map((function (t) {
      return (t % 36).toString(36)
    })).join('');
    var e,
    n,
    i
  }
  var l = Object(n.c) ({
    name: 'fsiHex',
    description: 'Fujitsu-Siemens hexdigits',
    examples: [
      'DEADBEEF',
      'AAAA-BBBB-CCCC-DEAD-BEEF'
    ],
    inputValidator: function (t) {
      return /^([0-9ABCDEF]{20}|[0-9ABCDEF]{8})$/i.test(t)
    },
    fun: function (t) {
      return [u(t)]
    }
  }),
  c = Object(n.c) ({
    name: 'fsiDecNew',
    description: 'Fujitsu-Siemens decimal nuevo (5x4)',
    examples: [
      '1234-4321-1234-4321-1234'
    ],
    inputValidator: function (t) {
      return /^\d{20}$/i.test(t)
    },
    fun: function (t) {
      return [(r = t, e = [
        '4798156302',
        '7201593846',
        '5412367098',
        '6587249310',
        '9137605284',
        '3974018625',
        '8052974163'
      ], [
        0,
        2,
        5,
        11,
        13,
        15,
        16
      ].map((function (t, n) {
        var i = parseInt(r.charAt(t), 10);
        return e[n].charAt(i)
      })).join(''))];
      var r,
      e
    }
  }),
  _ = Object(n.c) ({
    name: 'fsiDecOld',
    description: 'Fujitsu-Siemens decimal viejo (5x4)',
    examples: [
      '1234-4321-1234-4321-1234'
    ],
    inputValidator: function (t) {
      return /^\d{20}$/i.test(t)
    },
    fun: function (t) {
      return [f(t)]
    }
  }),
  h = Object(n.c) ({
    name: 'fsi24Dec',
    description: 'Fujitsu-Siemens decimal viejo (6x4)',
    examples: [
      '8F16-1234-4321-1234-4321-1234'
    ],
    inputValidator: function (t) {
      return /^[0-9ABCDEF]{4}\d{20}$/i.test(t)
    },
    fun: function (t) {
      return [(r = t, e = s(r.slice(4)), n = [
        240 & e[3] | 15 & e[0],
        240 & e[2] | 15 & e[1],
        240 & e[5] | 15 & e[6],
        240 & e[4] | 15 & e[7],
        240 & e[7] | 15 & e[4],
        240 & e[6] | 15 & e[5],
        240 & e[1] | 15 & e[2],
        240 & e[0] | 15 & e[3]
      ], n.forEach((function (t, r, e) {
        e[r] = t ^ '<7#&9?>s'.charCodeAt(r)
      })), n[0] = n[0] << 1 & 255 | n[0] >> 7, n[1] = n[1] << 7 & 255 | n[1] >> 1, n[2] = n[2] << 2 & 255 | n[2] >> 6, n[3] = n[3] << 8 & 255 | n[3] >> 0, n[4] = n[4] << 3 & 255 | n[4] >> 5, n[5] = n[5] << 6 & 255 | n[5] >> 2, n[6] = n[6] << 4 & 255 | n[6] >> 4, n[7] = n[7] << 5 & 255 | n[7] >> 3, n.map((function (t) {
        return (t % 36).toString(36)
      })).join(''))];
      var r,
      e,
      n
    }
  })
},
function (t, r, e) {
  'use strict';
  e.d(r, 'a', (function () {
    return i
  }));
  var n = function () {
    function t(t) {
      if (8 !== t.length) throw new Error('DES key tiene que ser de 8 bytes de largo');
      this.key = Uint8Array.from(t),
      this.subKeys = new Uint32Array(32),
      this.generateSubkeys()
    }
    return t.prototype.generateSubkeys = function () {
      for (var r = 0, e = 0, n = 0; n < 56; n++) {
        var i = t.PC1[n] - 1,
        o = this.key[i >>> 3] >>> 7 - (7 & i) & 1;
        n < 28 ? r |= o << n : e |= o << n - 28
      }
      function a(t, r) {
        return 268435455 & (t >>> r | t << 28 - r)
      }
      for (var u = 0; u < 16; u++) {
        var s = 0,
        f = 0;
        r = a(r, t.ITERATION_SHIFT[u]),
        e = a(e, t.ITERATION_SHIFT[u]);
        for (n = 0; n < 48; n++) {
          o = 1 & ((i = t.PC2[n] - 1) < 28 ? r >>> i : e >>> i - 28);
          n < 32 ? s |= o << n : f |= o << n - 32
        }
        this.subKeys[u << 1] = f,
        this.subKeys[u << 1 | 1] = s
      }
    },
    t.prototype.cryptBlock = function (r, e) {
      if (void 0 === e && (e = !0), 8 !== r.length) throw new Error('la entrada debe ser de 8 bytes de largo');
      for (var n = 0, i = 0, o = 0; o < 64; o++) {
        var a = r[(l = t.IP[o] - 1) >>> 3] >>> 7 - (7 & l) & 1;
        o < 32 ? n |= a << o : i |= a << o - 32
      }
      if (e) for (var u = 0; u < 16; u++) {
        var s = i;
        i = n ^ t.FUNC(i, this.subKeys[u << 1], this.subKeys[u << 1 | 1]),
        n = s
      } else for (u = 15; u >= 0; u--) {
        s = i;
        i = n ^ t.FUNC(i, this.subKeys[u << 1], this.subKeys[u << 1 | 1]),
        n = s
      }
      var f = new Uint8Array(8);
      for (o = 0; o < 64; o++) {
        var l;
        a = void 0;
        a = (l = t.FP[o] - 1) < 32 ? i >>> l & 1 : n >>> l - 32 & 1,
        f[o >>> 3] |= a << 7 - (7 & o)
      }
      return f
    },
    t.prototype.encryptBlock = function (t) {
      return this.cryptBlock(t, !0)
    },
    t.prototype.decryptBlock = function (t) {
      return this.cryptBlock(t, !1)
    },
    t.FUNC = function (r, e, n) {
      for (var i = 0, o = 0, a = 0, u = 0, s = 0; s < 48; s++) {
        var f = t.EXPANSION[s] - 1;
        s < 32 ? i |= (r >>> f & 1) << s : o |= (r >>> f & 1) << s - 32
      }
      function l(t) {
        return t < 32 ? i >>> t & 1 : o >>> t - 32 & 1
      }
      o ^= e,
      i ^= n;
      s = 0;
      for (var c = 0; s < 48; s += 6, c++) {
        var _ = l(s) << 1 | l(s + 5),
        h = l(s + 1) << 3 | l(s + 2) << 2 | l(s + 3) << 1 | l(s + 4);
        a = a << 4 | t.SBOX[c << 6 | _ << 4 | h]
      }
      for (s = 0; s < 32; s++) {
        u |= (a >>> (f = 32 - t.POST_SBOX[s]) & 1) << s
      }
      return u
    },
    t.IP = Uint8Array.from([58,
    50,
    42,
    34,
    26,
    18,
    10,
    2,
    60,
    52,
    44,
    36,
    28,
    20,
    12,
    4,
    62,
    54,
    46,
    38,
    30,
    22,
    14,
    6,
    64,
    56,
    48,
    40,
    32,
    24,
    16,
    8,
    57,
    49,
    41,
    33,
    25,
    17,
    9,
    1,
    59,
    51,
    43,
    35,
    27,
    19,
    11,
    3,
    61,
    53,
    45,
    37,
    29,
    21,
    13,
    5,
    63,
    55,
    47,
    39,
    31,
    23,
    15,
    7]),
    t.FP = Uint8Array.from([40,
    8,
    48,
    16,
    56,
    24,
    64,
    32,
    39,
    7,
    47,
    15,
    55,
    23,
    63,
    31,
    38,
    6,
    46,
    14,
    54,
    22,
    62,
    30,
    37,
    5,
    45,
    13,
    53,
    21,
    61,
    29,
    36,
    4,
    44,
    12,
    52,
    20,
    60,
    28,
    35,
    3,
    43,
    11,
    51,
    19,
    59,
    27,
    34,
    2,
    42,
    10,
    50,
    18,
    58,
    26,
    33,
    1,
    41,
    9,
    49,
    17,
    57,
    25]),
    t.PC1 = Uint8Array.from([57,
    49,
    41,
    33,
    25,
    17,
    9,
    1,
    58,
    50,
    42,
    34,
    26,
    18,
    10,
    2,
    59,
    51,
    43,
    35,
    27,
    19,
    11,
    3,
    60,
    52,
    44,
    36,
    63,
    55,
    47,
    39,
    31,
    23,
    15,
    7,
    62,
    54,
    46,
    38,
    30,
    22,
    14,
    6,
    61,
    53,
    45,
    37,
    29,
    21,
    13,
    5,
    28,
    20,
    12,
    4]),
    t.PC2 = Uint8Array.from([14,
    17,
    11,
    24,
    1,
    5,
    3,
    28,
    15,
    6,
    21,
    10,
    23,
    19,
    12,
    4,
    26,
    8,
    16,
    7,
    27,
    20,
    13,
    2,
    41,
    52,
    31,
    37,
    47,
    55,
    30,
    40,
    51,
    45,
    33,
    48,
    44,
    49,
    39,
    56,
    34,
    53,
    46,
    42,
    50,
    36,
    29,
    32]),
    t.EXPANSION = Uint8Array.from([32,
    1,
    2,
    3,
    4,
    5,
    4,
    5,
    6,
    7,
    8,
    9,
    8,
    9,
    10,
    11,
    12,
    13,
    12,
    13,
    14,
    15,
    16,
    17,
    16,
    17,
    18,
    19,
    20,
    21,
    20,
    21,
    22,
    23,
    24,
    25,
    24,
    25,
    26,
    27,
    28,
    29,
    28,
    29,
    30,
    31,
    32,
    1]),
    t.POST_SBOX = Uint8Array.from([16,
    7,
    20,
    21,
    29,
    12,
    28,
    17,
    1,
    15,
    23,
    26,
    5,
    18,
    31,
    10,
    2,
    8,
    24,
    14,
    32,
    27,
    3,
    9,
    19,
    13,
    30,
    6,
    22,
    11,
    4,
    25]),
    t.ITERATION_SHIFT = Uint8Array.from([1,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    1,
    2,
    2,
    2,
    2,
    2,
    2,
    1]),
    t.SBOX = Uint8Array.from([14,
    4,
    13,
    1,
    2,
    15,
    11,
    8,
    3,
    10,
    6,
    12,
    5,
    9,
    0,
    7,
    0,
    15,
    7,
    4,
    14,
    2,
    13,
    1,
    10,
    6,
    12,
    11,
    9,
    5,
    3,
    8,
    4,
    1,
    14,
    8,
    13,
    6,
    2,
    11,
    15,
    12,
    9,
    7,
    3,
    10,
    5,
    0,
    15,
    12,
    8,
    2,
    4,
    9,
    1,
    7,
    5,
    11,
    3,
    14,
    10,
    0,
    6,
    13,
    15,
    1,
    8,
    14,
    6,
    11,
    3,
    4,
    9,
    7,
    2,
    13,
    12,
    0,
    5,
    10,
    3,
    13,
    4,
    7,
    15,
    2,
    8,
    14,
    12,
    0,
    1,
    10,
    6,
    9,
    11,
    5,
    0,
    14,
    7,
    11,
    10,
    4,
    13,
    1,
    5,
    8,
    12,
    6,
    9,
    3,
    2,
    15,
    13,
    8,
    10,
    1,
    3,
    15,
    4,
    2,
    11,
    6,
    7,
    12,
    0,
    5,
    14,
    9,
    10,
    0,
    9,
    14,
    6,
    3,
    15,
    5,
    1,
    13,
    12,
    7,
    11,
    4,
    2,
    8,
    13,
    7,
    0,
    9,
    3,
    4,
    6,
    10,
    2,
    8,
    5,
    14,
    12,
    11,
    15,
    1,
    13,
    6,
    4,
    9,
    8,
    15,
    3,
    0,
    11,
    1,
    2,
    12,
    5,
    10,
    14,
    7,
    1,
    10,
    13,
    0,
    6,
    9,
    8,
    7,
    4,
    15,
    14,
    3,
    11,
    5,
    2,
    12,
    7,
    13,
    14,
    3,
    0,
    6,
    9,
    10,
    1,
    2,
    8,
    5,
    11,
    12,
    4,
    15,
    13,
    8,
    11,
    5,
    6,
    15,
    0,
    3,
    4,
    7,
    2,
    12,
    1,
    10,
    14,
    9,
    10,
    6,
    9,
    0,
    12,
    11,
    7,
    13,
    15,
    1,
    3,
    14,
    5,
    2,
    8,
    4,
    3,
    15,
    0,
    6,
    10,
    1,
    13,
    8,
    9,
    4,
    5,
    11,
    12,
    7,
    2,
    14,
    2,
    12,
    4,
    1,
    7,
    10,
    11,
    6,
    8,
    5,
    3,
    15,
    13,
    0,
    14,
    9,
    14,
    11,
    2,
    12,
    4,
    7,
    13,
    1,
    5,
    0,
    15,
    10,
    3,
    9,
    8,
    6,
    4,
    2,
    1,
    11,
    10,
    13,
    7,
    8,
    15,
    9,
    12,
    5,
    6,
    3,
    0,
    14,
    11,
    8,
    12,
    7,
    1,
    14,
    2,
    13,
    6,
    15,
    0,
    9,
    10,
    4,
    5,
    3,
    12,
    1,
    10,
    15,
    9,
    2,
    6,
    8,
    0,
    13,
    3,
    4,
    14,
    7,
    5,
    11,
    10,
    15,
    4,
    2,
    7,
    12,
    9,
    5,
    6,
    1,
    13,
    14,
    0,
    11,
    3,
    8,
    9,
    14,
    15,
    5,
    2,
    8,
    12,
    3,
    7,
    0,
    4,
    10,
    1,
    13,
    11,
    6,
    4,
    3,
    2,
    12,
    9,
    5,
    15,
    10,
    11,
    14,
    1,
    7,
    6,
    0,
    8,
    13,
    4,
    11,
    2,
    14,
    15,
    0,
    8,
    13,
    3,
    12,
    9,
    7,
    5,
    10,
    6,
    1,
    13,
    0,
    11,
    7,
    4,
    9,
    1,
    10,
    14,
    3,
    5,
    12,
    2,
    15,
    8,
    6,
    1,
    4,
    11,
    13,
    12,
    3,
    7,
    14,
    10,
    15,
    6,
    8,
    0,
    5,
    9,
    2,
    6,
    11,
    13,
    8,
    1,
    4,
    10,
    7,
    9,
    5,
    0,
    15,
    14,
    2,
    3,
    12,
    13,
    2,
    8,
    4,
    6,
    15,
    11,
    1,
    10,
    9,
    3,
    14,
    5,
    0,
    12,
    7,
    1,
    15,
    13,
    8,
    10,
    3,
    7,
    4,
    12,
    5,
    6,
    11,
    0,
    14,
    9,
    2,
    7,
    11,
    4,
    1,
    9,
    12,
    14,
    2,
    0,
    6,
    10,
    13,
    15,
    3,
    5,
    8,
    2,
    1,
    14,
    7,
    4,
    10,
    8,
    13,
    15,
    12,
    9,
    0,
    3,
    5,
    6,
    11]),
    t
  }();
  function i(t, r) {
    for (var e = /^[0-9A-Fa-f]$/, i = Uint8Array.from('23AAFFAD'.split('').map((function (t) {
      return t.charCodeAt(0)
    }))), o = new n(i), a = new Uint8Array(8), u = new Uint8Array(8), s = '', f = 0; f < 8; f++) u[f] = parseInt(t.slice(2 * f, 2 * f + 2), 16);
    a[0] = r.charCodeAt(r.length - 1);
    var l = o.encryptBlock(a),
    c = new n(l).decryptBlock(u);
    for (f = 0; f < 8; f++) {
      var _ = String.fromCharCode(c[f]);
      if (!e.test(_)) return;
      s += _
    }
    return s
  }
},
function (t, r, e) {
  'use strict';
  e.d(r, 'c', (function () {
    return l
  })),
  e.d(r, 'a', (function () {
    return c
  })),
  e.d(r, 'b', (function () {
    return _
  }));
  var n = e(0),
  i = e.n(n),
  o = e(1),
  a = function (t, r) {
    var e = 'function' == typeof Symbol && t[Symbol.iterator];
    if (!e) return t;
    var n,
    i,
    o = e.call(t),
    a = [
    ];
    try {
      for (; (void 0 === r || r-- > 0) && !(n = o.next()).done; ) a.push(n.value)
    } catch (t) {
      i = {
        error: t
      }
    } finally {
      try {
        n && !n.done && (e = o.return) && e.call(o)
      } finally {
        if (i) throw i.error
      }
    }
    return a
  },
  u = function () {
    function t(r, e) {
      this.polynom = r,
      e && Array.isArray(e) ? this.table = e : this.table = t.getCRC64Table(r),
      this.crc = i.a.BigInt(0)
    }
    return t.prototype.reset = function () {
      this.crc = i.a.BigInt(0)
    },
    t.prototype.update = function (t) {
      for (var r = 0; r < t.length; r++) {
        var e = 255 & t[r],
        n = i.a.toNumber(i.a.asUintN(8, i.a.bitwiseXor(this.crc, i.a.BigInt(e)))),
        o = i.a.bitwiseXor(this.table[n], i.a.signedRightShift(this.crc, i.a.BigInt(8)));
        this.crc = i.a.asUintN(64, o)
      }
    },
    t.prototype.digest = function () {
      return this.crc
    },
    t.prototype.hexdigest = function () {
      return ('0'.repeat(16) + this.digest().toString(16)).slice( - 16)
    },
    t.makeTable = function (t) {
      for (var r = [
      ], e = 0; e < 256; e++) {
        for (var n = i.a.BigInt(e), o = 0; o < 8; o++) n = i.a.EQ(i.a.bitwiseAnd(n, i.a.BigInt(1)), 1) ? i.a.bitwiseXor(i.a.signedRightShift(n, i.a.BigInt(1)), t) : i.a.signedRightShift(n, i.a.BigInt(1));
        r.push(i.a.asUintN(64, n))
      }
      return r
    },
    t.getCRC64Table = function (r) {
      var e = r.toString(10),
      n = t.tableCache[e];
      if (void 0 !== n && Array.isArray(n)) return n;
      var o = t.makeTable(r);
      return i.a.EQ(r, t.ECMA_POLYNOMIAL) && (t.tableCache[e] = o),
      o
    },
    t.tableCache = {
    },
    t.ECMA_POLYNOMIAL = i.a.BigInt('14514072000185962306'),
    t
  }(),
  s = function () {
    function t(r) {
      this.bitlen = i.a.BigInt(0),
      this.datalen = 0,
      this.data = new Uint8Array(64),
      this.state = t.SHA256_IV.slice(),
      r && (r instanceof Uint8Array || Array.isArray(r)) && this.update(r)
    }
    return t.prototype.transform = function () {
      var r = new Uint32Array(64);
      function e(t, r) {
        return t >>> r | t << 32 - r
      }
      function n(t, r, e) {
        return t & r ^ ~t & e
      }
      function i(t, r, e) {
        return t & r ^ t & e ^ r & e
      }
      function o(t) {
        return e(t, 2) ^ e(t, 13) ^ e(t, 22)
      }
      function u(t) {
        return e(t, 6) ^ e(t, 11) ^ e(t, 25)
      }
      function s(t) {
        return e(t, 7) ^ e(t, 18) ^ t >>> 3
      }
      function f(t) {
        return e(t, 17) ^ e(t, 19) ^ t >>> 10
      }
      for (var l = 0, c = 0; l < 16; l++, c += 4) r[l] = this.data[c] << 24 | this.data[c + 1] << 16 | this.data[c + 2] << 8 | this.data[c + 3];
      for (l = 16; l < 64; l++) r[l] = f(r[l - 2]) + r[l - 7] + s(r[l - 15]) + r[l - 16] >>> 0;
      var _ = a(this.state, 8),
      h = _[0],
      g = _[1],
      v = _[2],
      d = _[3],
      p = _[4],
      y = _[5],
      m = _[6],
      b = _[7];
      for (l = 0; l < 64; l++) {
        var w = b + u(p) + n(p, y, m) + t.SHA256_CONSTANTS[l] + r[l],
        B = o(h) + i(h, g, v);
        b = m,
        m = y,
        y = p,
        p = d + w >>> 0,
        d = v,
        v = g,
        g = h,
        h = w + B >>> 0
      }
      this.state[0] += h,
      this.state[1] += g,
      this.state[2] += v,
      this.state[3] += d,
      this.state[4] += p,
      this.state[5] += y,
      this.state[6] += m,
      this.state[7] += b
    },
    t.prototype.final = function () {
      var t = 63 & this.datalen;
      if (this.datalen < 56) for (this.data[t++] = 128; t < 56; ) this.data[t++] = 0;
       else {
        for (this.data[t++] = 128; t < 64; ) this.data[t++] = 0;
        this.transform();
        for (var r = 0; r < 56; r++) this.data[r] = 0
      }
      this.bitlen = i.a.add(this.bitlen, i.a.BigInt(8 * this.datalen));
      for (var e = 63, n = 0; e >= 56; e--, n += 8) {
        var o = i.a.asUintN(8, i.a.signedRightShift(this.bitlen, i.a.BigInt(n)));
        this.data[e] = i.a.toNumber(o)
      }
      this.transform();
      for (var a = new Uint8Array(32), u = 0; u < 4; u++) for (n = 0; n < 8; n++) a[u + 4 * n] = this.state[n] >>> 24 - 8 * u & 255;
      return a
    },
    t.prototype.copy = function () {
      var r = new t;
      return r.state = this.state.slice(),
      r.data = this.data.slice(),
      r.bitlen = this.bitlen,
      r.datalen = this.datalen,
      r
    },
    t.prototype.update = function (t) {
      for (var r = 0; r < t.length; r++) {
        var e = t[r];
        this.data[this.datalen] = e,
        this.datalen++,
        this.datalen >= 64 && (this.transform(), this.bitlen = i.a.add(this.bitlen, i.a.BigInt(512)), this.datalen = 0)
      }
    },
    t.prototype.digest = function () {
      return this.copy().final()
    },
    t.prototype.hexdigest = function () {
      return Array.from(this.digest()).map((function (t) {
        return (t &= 255) < 15 ? '0' + t.toString(16) : t.toString(16)
      })).join('')
    },
    t.SHA256_CONSTANTS = Uint32Array.from([1116352408,
    1899447441,
    3049323471,
    3921009573,
    961987163,
    1508970993,
    2453635748,
    2870763221,
    3624381080,
    310598401,
    607225278,
    1426881987,
    1925078388,
    2162078206,
    2614888103,
    3248222580,
    3835390401,
    4022224774,
    264347078,
    604807628,
    770255983,
    1249150122,
    1555081692,
    1996064986,
    2554220882,
    2821834349,
    2952996808,
    3210313671,
    3336571891,
    3584528711,
    113926993,
    338241895,
    666307205,
    773529912,
    1294757372,
    1396182291,
    1695183700,
    1986661051,
    2177026350,
    2456956037,
    2730485921,
    2820302411,
    3259730800,
    3345764771,
    3516065817,
    3600352804,
    4094571909,
    275423344,
    430227734,
    506948616,
    659060556,
    883997877,
    958139571,
    1322822218,
    1537002063,
    1747873779,
    1955562222,
    2024104815,
    2227730452,
    2361852424,
    2428436474,
    2756734187,
    3204031479,
    3329325298]),
    t.SHA256_IV = Uint32Array.from([1779033703,
    3144134277,
    1013904242,
    2773480762,
    1359893119,
    2600822924,
    528734635,
    1541459225]),
    t
  }(),
  f = function () {
    function t(r) {
      this.roundKey = t.keyExpansion(r)
    }
    return t.prototype.encryptBlock = function (r) {
      if (16 !== r.length) throw new Error('Invalid block length');
      var e = r.slice();
      t.addRoundKey(0, e, this.roundKey);
      for (var n = 1; t.subBytes(e), t.shiftRows(e), 10 !== n; n++) t.mixColumns(e),
      t.addRoundKey(n, e, this.roundKey);
      return t.addRoundKey(t.NR, e, this.roundKey),
      e
    },
    t.keyExpansion = function (r) {
      if (16 !== r.length) throw new Error('Key should be 16 bytes');
      for (var e = new Uint8Array(176), n = 0; n < 4 * t.NK; n++) e[n] = r[n];
      var i = new Uint8Array(4);
      for (n = t.NK; n < t.NB * (t.NR + 1); n++) {
        var o = 4 * (n - 1);
        if (i[0] = e[o + 0], i[1] = e[o + 1], i[2] = e[o + 2], i[3] = e[o + 3], n % t.NK == 0) {
          var a = i[0];
          i[0] = i[1],
          i[1] = i[2],
          i[2] = i[3],
          i[3] = a,
          i[0] = t.sbox[i[0]],
          i[1] = t.sbox[i[1]],
          i[2] = t.sbox[i[2]],
          i[3] = t.sbox[i[3]],
          i[0] ^= t.rcon[n / t.NK]
        }
        var u = 4 * n,
        s = 4 * (n - t.NK);
        e[u + 0] = e[s + 0] ^ i[0],
        e[u + 1] = e[s + 1] ^ i[1],
        e[u + 2] = e[s + 2] ^ i[2],
        e[u + 3] = e[s + 3] ^ i[3]
      }
      return e
    },
    t.addRoundKey = function (r, e, n) {
      for (var i = 0; i < 4; i++) for (var o = 0; o < 4; o++) e[4 * i + o] ^= n[r * t.NB * 4 + i * t.NB + o],
      e[4 * i + o] &= 255
    },
    t.subBytes = function (r) {
      for (var e = 0; e < 4; e++) for (var n = 0; n < 4; n++) r[4 * n + e] = t.sbox[r[4 * n + e]]
    },
    t.shiftRows = function (t) {
      var r = t[1];
      t[1] = t[5],
      t[5] = t[9],
      t[9] = t[13],
      t[13] = r,
      r = t[2],
      t[2] = t[10],
      t[10] = r,
      r = t[6],
      t[6] = t[14],
      t[14] = r,
      r = t[3],
      t[3] = t[15],
      t[15] = t[11],
      t[11] = t[7],
      t[7] = r
    },
    t.mixColumns = function (t) {
      var r,
      e;
      function n(t) {
        return t << 1 ^ 27 * (t >>> 7 & 1)
      }
      for (var i = 0; i < 4; i++) {
        var o = t[4 * i + 0];
        r = t[4 * i + 0] ^ t[4 * i + 1] ^ t[4 * i + 2] ^ t[4 * i + 3],
        e = n(t[4 * i + 0] ^ t[4 * i + 1]),
        t[4 * i + 0] ^= e ^ r,
        e = n(t[4 * i + 1] ^ t[4 * i + 2]),
        t[4 * i + 1] ^= e ^ r,
        e = n(t[4 * i + 2] ^ t[4 * i + 3]),
        t[4 * i + 2] ^= e ^ r,
        e = n(t[4 * i + 3] ^ o),
        t[4 * i + 3] ^= e ^ r
      }
    },
    t.NB = 4,
    t.NK = 4,
    t.NR = 10,
    t.sbox = Uint8Array.from([99,
    124,
    119,
    123,
    242,
    107,
    111,
    197,
    48,
    1,
    103,
    43,
    254,
    215,
    171,
    118,
    202,
    130,
    201,
    125,
    250,
    89,
    71,
    240,
    173,
    212,
    162,
    175,
    156,
    164,
    114,
    192,
    183,
    253,
    147,
    38,
    54,
    63,
    247,
    204,
    52,
    165,
    229,
    241,
    113,
    216,
    49,
    21,
    4,
    199,
    35,
    195,
    24,
    150,
    5,
    154,
    7,
    18,
    128,
    226,
    235,
    39,
    178,
    117,
    9,
    131,
    44,
    26,
    27,
    110,
    90,
    160,
    82,
    59,
    214,
    179,
    41,
    227,
    47,
    132,
    83,
    209,
    0,
    237,
    32,
    252,
    177,
    91,
    106,
    203,
    190,
    57,
    74,
    76,
    88,
    207,
    208,
    239,
    170,
    251,
    67,
    77,
    51,
    133,
    69,
    249,
    2,
    127,
    80,
    60,
    159,
    168,
    81,
    163,
    64,
    143,
    146,
    157,
    56,
    245,
    188,
    182,
    218,
    33,
    16,
    255,
    243,
    210,
    205,
    12,
    19,
    236,
    95,
    151,
    68,
    23,
    196,
    167,
    126,
    61,
    100,
    93,
    25,
    115,
    96,
    129,
    79,
    220,
    34,
    42,
    144,
    136,
    70,
    238,
    184,
    20,
    222,
    94,
    11,
    219,
    224,
    50,
    58,
    10,
    73,
    6,
    36,
    92,
    194,
    211,
    172,
    98,
    145,
    149,
    228,
    121,
    231,
    200,
    55,
    109,
    141,
    213,
    78,
    169,
    108,
    86,
    244,
    234,
    101,
    122,
    174,
    8,
    186,
    120,
    37,
    46,
    28,
    166,
    180,
    198,
    232,
    221,
    116,
    31,
    75,
    189,
    139,
    138,
    112,
    62,
    181,
    102,
    72,
    3,
    246,
    14,
    97,
    53,
    87,
    185,
    134,
    193,
    29,
    158,
    225,
    248,
    152,
    17,
    105,
    217,
    142,
    148,
    155,
    30,
    135,
    233,
    206,
    85,
    40,
    223,
    140,
    161,
    137,
    13,
    191,
    230,
    66,
    104,
    65,
    153,
    45,
    15,
    176,
    84,
    187,
    22]),
    t.rcon = Uint8Array.from([141,
    1,
    2,
    4,
    8,
    16,
    32,
    64,
    128,
    27,
    54,
    108,
    216,
    171,
    77,
    154]),
    t
  }();
  var l = Object(o.c) ({
    name: 'insydeH2O',
    description: 'Insyde H2O BIOS (Acer, HP)',
    examples: [
      '03133610'
    ],
    inputValidator: function (t) {
      return /^\d{8}$/i.test(t)
    },
    fun: function (t) {
      for (var r = 'Insyde Software Corp.', e = (parseInt(t, 10).toString() + '\x00'.repeat(8)).slice(0, 8), n = '', i = '', o = '', a = 0; a < 8; a++) {
        var u = r.charCodeAt(a) + a ^ t.charCodeAt(a);
        n += (u % 10).toString(),
        i += ((u = r.charCodeAt(a) + a ^ e.charCodeAt(a)) % 10).toString(),
        o += ((u = ':@>96H.\nG-MDGHBT'.charCodeAt(a) ^ e.charCodeAt(a)) % 10).toString()
      }
      return n === i ? [
        n,
        o
      ] : [
        n,
        i,
        o
      ]
    }
  }),
  c = Object(o.c) ({
    name: 'acerInsyde10',
    description: 'Acer Insyde 10 digits',
    examples: [
      '0173549286'
    ],
    inputValidator: function (t) {
      return /^\d{10}$/i.test(t)
    },
    fun: function (t) {
      var r = Uint8Array.from(t.split('').map((function (t) {
        return 255 & t.charCodeAt(0)
      }))),
      e = new s(r).digest(),
      n = function (t) {
        if (32 !== t.length) throw new Error('Input array should have 32 length');
        var r = function (t) {
          for (var r = new Uint8Array(16), e = 0; e < 16; e++) {
            for (var n = 0, i = 0; i < 8; i++) n += t[(e >> 2 << 3) + i] * t[4 * i + (3 & e)];
            r[e] = 255 & n
          }
          return r
        }(t);
        switch (t[8] % 6) {
          case 0:
            return function (t) {
              for (var r = new Uint8Array(16), e = 0, n = 3; n >= 0; n--) for (var i = 0; i < 16; i += 4) r[e++] = t[n + i];
              return r
            }(r);
          case 1:
            return function (t) {
              for (var r = new Uint8Array(16), e = 0, n = 0; n < 4; n++) for (var i = 12; i >= 0; i -= 4) r[e++] = t[n + i];
              return r
            }(r);
          case 2:
            return function (t) {
              for (var r = new Uint8Array(16), e = 0, n = 0; n < 4; n++) for (var i = 0; i < 4; i++) r[e++] = t[(i + n & 3) + 4 * n] + n & 255;
              return r
            }(r);
          case 3:
            return function (t) {
              for (var r = new Uint8Array(16), e = 0, n = 0, i = 0, o = 0; o < 4; o++) n ^= t[5 * o],
              i ^= t[3 * o + 3];
              for (o = 0; o < 16; o++) {
                var a = 0 == (1 & o) ? n : i;
                r[e++] = t[o] ^ a
              }
              return r
            }(r);
          case 4:
            return function (t) {
              for (var r = new Uint8Array(16), e = 0, n = 0; n < 16; n++) {
                var i = t[n],
                o = t[n + 1 & 15],
                a = o < i ? o : 255;
                r[e++] = i ^ a
              }
              return r
            }(r);
          default:
            return function (t) {
              for (var r = new Uint8Array(16), e = 0; e < 4; e++) {
                for (var n = 0, i = 0; i < 16; i += 4) n ^= t[i + e];
                for (i = 0; i < 16; i += 4) {
                  var o = e + i;
                  r[o] = t[o] * n & 255
                }
              }
              return r
            }(r)
        }
      }(e),
      i = function (t) {
        for (var r = 15 & t[9], e = new Uint8Array(16), n = 0; n < e.length; n++) e[n] = t[(2 * r + 1) * n % t.length];
        return e
      }(e),
      o = new f(n).encryptBlock(i),
      a = new u(u.ECMA_POLYNOMIAL);
      return a.update(o),
      [
        a.hexdigest()
      ]
    }
  }),
  _ = Object(o.c) ({
    name: 'hpInsyde',
    description: 'HP Insyde H2O',
    examples: [
      'i 70412809',
      'I 59170869'
    ],
    inputValidator: function (t) {
      return /^i\s*\d{8}$/i.test(t)
    },
    fun: function (t) {
      var r = 'Insyde Software Corp.',
      e = /^i\s*(\d{8})$/i.exec(t);
      if (!e || 2 !== e.length) return [];
      t = e[1];
      for (var n = '', i = '', o = 0; o < 8; o++) {
        var a = 'c6B|wS^8'.charCodeAt(o) + o ^ t.charCodeAt(o);
        n += (a % 10).toString(),
        i += ((a = r.charCodeAt(o) + o ^ t.charCodeAt(o)) % 10).toString()
      }
      return [n,
      i]
    }
  })
},
function (t, r, e) {
  'use strict';
  e.d(r, 'a', (function () {return n}));
  var n = function () {},
  i = document.createElement('script');
  i.async = !0;
  i.src = 'https://www.googletagmanager.com/gtag/js?id=UA-112154345-1';
  var o = document.getElementsByTagName('script') [0];
  o.parentNode.insertBefore(i, o),
  window.dataLayer = window.dataLayer || [
  ],
  (n = function () {
    window.dataLayer.push(arguments)
  }) ('js', new Date),
  n('config', 'UA-112154345-1', {
    custom_map: {
      dimension1: 'siteVersion'
    },
    transport_type: 'beacon'
  })},
function (t, r, e) {
  'use strict';
  e.d(r, 'b', (function () {
    return g
  })),
  e.d(r, 'a', (function () {
    return v
  }));
  var n = e(10),
  i = e(12),
  o = e(4),
  a = e(5),
  u = e(14),
  s = e(7),
  f = e(2),
  l = e(11),
  c = e(15),
  _ = e(16),
  h = function (t, r) {
    var e = 'function' == typeof Symbol && t[Symbol.iterator];
    if (!e) return t;
    var n,
    i,
    o = e.call(t),
    a = [
    ];
    try {
      for (; (void 0 === r || r-- > 0) && !(n = o.next()).done; ) a.push(n.value)
    } catch (t) {
      i = {
        error: t
      }
    } finally {
      try {
        n && !n.done && (e = o.return) && e.call(o)
      } finally {
        if (i) throw i.error
      }
    }
    return a
  },
  g = [
    i.a,
    s.a,
    c.a,
    _.a,
    l.a,
    l.b,
    o.d,
    o.c,
    o.a,
    o.b,
    a.d,
    a.a,
    a.b,
    a.c,
    u.a,
    s.b,
    s.c,
    f.g,
    f.f,
    f.d,
    f.a,
    f.b,
    f.c,
    f.e
  ];
  function v(t) {
    return g.map((function (r) {
      var e = Object(n.a) (),
      i = r(t);
      return [r,
      i,
      Object(n.a) () - e]
    })).filter((function (t) {
      var r = h(t, 2),
      e = (r[0], r[1]);
      return void 0 !== e && e.length >= 1
    }))
  }
},
function (t, r, e) {
  'use strict';
  e.d(r, 'a', (function () {
    return n
  }));
  var n = function () {
    if ('undefined' != typeof performance && performance) {
      var t = performance.now || performance.webkitNow || performance.mozNow || performance.oNow || performance.msNow;
      return t ? t.bind(performance) : Date.now
    }
    return Date.now
  }()
},
function (t, r, e) {
  'use strict';
  e.d(r, 'b', (function () {
    return _
  })),
  e.d(r, 'a', (function () {
    return h
  }));
  var n = e(1),
  i = function (t) {
    var r = 'function' == typeof Symbol && Symbol.iterator,
    e = r && t[r],
    n = 0;
    if (e) return e.call(t);
    if (t && 'number' == typeof t.length) return {
      next: function () {
        return t && n >= t.length && (t = void 0),
        {
          value: t && t[n++],
          done: !t
        }
      }
    };
    throw new TypeError(r ? 'Object is not iterable.' : 'Symbol.iterator is not defined.')
  },
  o = [
    7,
    1,
    5,
    3,
    0,
    6,
    2,
    5,
    2,
    3,
    0,
    6,
    1,
    7,
    6,
    1,
    5,
    2,
    7,
    1,
    0,
    3,
    7,
    6,
    1,
    0,
    5,
    2,
    1,
    5,
    7,
    3,
    2,
    0,
    6
  ],
  a = [
    1,
    6,
    2,
    5,
    7,
    3,
    0,
    7,
    1,
    6,
    2,
    5,
    0,
    3,
    0,
    6,
    5,
    1,
    1,
    7,
    2,
    5,
    2,
    3,
    7,
    6,
    2,
    1,
    3,
    7,
    6,
    5,
    0,
    1,
    7
  ],
  u = Uint8Array.from([3,
  6,
  3,
  1,
  6,
  7,
  7,
  7,
  2,
  6,
  4,
  3,
  4,
  6,
  1,
  7,
  2,
  1,
  7,
  7,
  5,
  3,
  3,
  1,
  2,
  3,
  1,
  2,
  1,
  7,
  4,
  7,
  6,
  2,
  4,
  4,
  1,
  6,
  1,
  5,
  6,
  6,
  7,
  5,
  7,
  7,
  4,
  3,
  1,
  1,
  1,
  6,
  3,
  2,
  7,
  3,
  7,
  3,
  7,
  3,
  5,
  6,
  4,
  1,
  1,
  3,
  6,
  6,
  1,
  4,
  3,
  7,
  6,
  7,
  5,
  3,
  6,
  7,
  6,
  3,
  1,
  3,
  5,
  7,
  5,
  6,
  2,
  2,
  7,
  5,
  7,
  1,
  2,
  3,
  2,
  1,
  6,
  4,
  5,
  3]);
  function s(t) {
    var r,
    e,
    n = '';
    try {
      for (var o = i(t), a = o.next(); !a.done; a = o.next()) {
        var u = a.value;
        if (0 === u) return n;
        if (u < 32 || u > 127) return;
        n += String.fromCharCode(u)
      }
    } catch (t) {
      r = {
        error: t
      }
    } finally {
      try {
        a && !a.done && (e = o.return) && e.call(o)
      } finally {
        if (r) throw r.error
      }
    }
    return n
  }
  function f(t, r, e) {
    for (var n = [
    ], i = 0; i < t.length; i++) {
      var o = t[i] << e[7 * r + i] & 255 | t[i] >> 8 - e[7 * r + i];
      n.push(o)
    }
    return n
  }
  function l(t, r) {
    return t << r & 255 | t >> 8 - r
  }
  function c(t) {
    return t >= 127 || t < 32
  }
  var _ = Object(n.c) ({
    name: 'samsung',
    description: 'Samsung',
    examples: [
      '07088120410C0000'
    ],
    inputValidator: function (t) {
      return /^[0-9ABCDEF]+$/i.test(t) && (12 === t.length || 14 === t.length || 16 === t.length || 18 === t.length)
    },
    fun: function (t) {
      for (var r = [
      ], e = 1; e < Math.floor(t.length / 2); e++) {
        var i = parseInt(t.charAt(2 * e) + t.charAt(2 * e + 1), 16);
        r.push(i)
      }
      var u = parseInt(t.substring(0, 2), 16) % 5,
      l = function (t) {
        return Object(n.b) (f(r, u, t))
      },
      c = l(o);
      return '' === c && (c = l(a)),
      [
        c,
        s(f(r, u, o)),
        s(f(r, u, a))
      ].filter((function (t) {
        return !!t
      }))
    }
  }),
  h = Object(n.c) ({
    name: 'samsung44Hex',
    description: 'Samsung 44 Hexdecimal',
    examples: [
      '54574AAD6A8B1B9353F6FA66DCD2DA91B06DBD8E3204'
    ],
    inputValidator: function (t) {
      return /^[0-9ABCDEF]{44}$/i.test(t)
    },
    fun: function (t) {
      var r = function (t) {
        if (44 === t.length) {
          for (var r = new Uint8Array(22), e = '', n = 21; n >= 0; n--) {
            var i = parseInt(t[2 * n], 16),
            o = parseInt(t[2 * n + 1], 16);
            r[21 - n] = o << 4 | i
          }
          var a = r[0] >> 3;
          if (!(a > 20)) {
            var s = r[1] % 5 * 20;
            for (n = 0; n < a; n++) {
              var f = u[s + n],
              _ = l(l(r[n + 2], f), 4);
              if (c(_)) return;
              e += String.fromCharCode(_)
            }
            return e
          }
        }
      }(t);
      return r ? [
        r
      ] : [
      ]
    }
  })
},
function (t, r, e) {
  'use strict';
  e.d(r, 'a', (function () {
    return c
  }));
  var n = e(1),
  i = function (t, r) {
    var e = 'function' == typeof Symbol && t[Symbol.iterator];
    if (!e) return t;
    var n,
    i,
    o = e.call(t),
    a = [
    ];
    try {
      for (; (void 0 === r || r-- > 0) && !(n = o.next()).done; ) a.push(n.value)
    } catch (t) {
      i = {
        error: t
      }
    } finally {
      try {
        n && !n.done && (e = o.return) && e.call(o)
      } finally {
        if (i) throw i.error
      }
    }
    return a
  };
  function o(t, r, e) {
    void 0 === e && (e = ' ');
    for (var n = r - t.length, i = 0; i < n; i++) t = e + t;
    return t
  }
  var a = function (t, r, e) {
    void 0 === t && (t = 11),
    void 0 === r && (r = 19),
    void 0 === e && (e = 6);
    var n = [
    ],
    o = '0'.charCodeAt(0);
    n[0] = t + o,
    n[1] = r + o,
    n[2] = e + o,
    n[3] = '6'.charCodeAt(0),
    n[4] = '7'.charCodeAt(0),
    n[5] = '8'.charCodeAt(0),
    n[6] = '9'.charCodeAt(0);
    for (var a = n.reduce((function (t, r) {
      return t + r
    }), 0), u = 7; u < 32; u++) a = 33676 * a + 12345 >>> 0,
    n[u] = (a >> 16 & 32767) % 43 + o;
    var s = t * r,
    f = function (t, r) {
      for (var e, n = 2, o = 0; o < r; o++) {
        for (var a = n, u = t; u > 0; ) u < a && (e = i([a,
        u], 2), u = e[0], a = e[1]),
        u %= a;
        1 !== a && n++
      }
      return n
    }((t - 1) * (r - 1), e);
    return n.map((function (t) {
      return function (t, r, e) {
        t >= e && (t %= e);
        var n = t;
        if (1 !== r) for (var i = 0; i < r - 1; i++) n = t * n % e;
        return n
      }(t - o, f, s)
    }))
  }(),
  u = i(function () {
    for (var t = [
    ], r = [
    ], e = [
    ], n = 1990; n <= 2100; n++) t.push(o(n.toString(), 4, '0'));
    for (var i = 1; i <= 12; i++) r.push(o(i.toString(), 2, '0'));
    for (var a = 1; a <= 31; a++) e.push(o(a.toString(), 2, '0'));
    return [new RegExp('(' + t.join('|') + ')(' + r.join('|') + ')(' + e.join('|') + ')'),
    new RegExp('(' + e.join('|') + ')(' + r.join('|') + ')(' + t.join('|') + ')')]
  }(), 2),
  s = u[0],
  f = u[1];
  function l(t, r, e) {
    for (var n = o(t.toString(), 4, '0') + o(r.toString(), 2, '0') + o(e.toString(), 2, '0'), i = parseInt(n, 16), u = '', s = 0; s < 8; s++) {
      var f = a[(i = 33676 * i + 12345 >>> 0) >> 16 & 31] % 36;
      u += f > 9 ? String.fromCharCode(f + '7'.charCodeAt(0)) : String.fromCharCode(f + '0'.charCodeAt(0))
    }
    return u
  }
  var c = Object(n.c) ({
    name: 'asusDate',
    description: 'ASUS (Using date)',
    examples: [
      '2010-02-03'
    ],
    inputValidator: function (t) {
      return 8 === t.length
    },
    fun: function (t) {
      var r = [
      ];
      if (s.test(t)) {
        var e = parseInt(t.slice(0, 4), 10),
        n = parseInt(t.slice(4, 6), 10),
        i = parseInt(t.slice(6, 8), 10);
        r.push(l(e, n, i))
      }
      if (f.test(t)) {
        i = parseInt(t.slice(0, 2), 10),
        n = parseInt(t.slice(2, 4), 10),
        e = parseInt(t.slice(4, 8), 10);
        r.push(l(e, n, i))
      }
      return r
    }
  })
},
function (t, r, e) {
  'use strict';
  e.d(r, 'a', (function () {
    return k
  }));
  var n,
  i = (n = function (t, r) {
    return (n = Object.setPrototypeOf || {
      __proto__: [
      ]
    }
    instanceof Array && function (t, r) {
      t.__proto__ = r
    }
    || function (t, r) {
      for (var e in r) r.hasOwnProperty(e) && (t[e] = r[e])
    }) (t, r)
  }, function (t, r) {
    function e() {
      this.constructor = t
    }
    n(t, r),
    t.prototype = null === r ? Object.create(r) : (e.prototype = r.prototype, new e)
  }),
  o = [
    3614090360,
    3905402710,
    606105819,
    3250441966,
    4118548399,
    1200080426,
    2821735955,
    4249261313,
    1770035416,
    2336552879,
    4294925233,
    2304563134,
    1804603682,
    4254626195,
    2792965006,
    1236535329,
    4129170786,
    3225465664,
    643717713,
    3921069994,
    3593408605,
    38016083,
    3634488961,
    3889429448,
    568446438,
    3275163606,
    4107603335,
    1163531501,
    2850285829,
    4243563512,
    1735328473,
    2368359562,
    4294588738,
    2272392833,
    1839030562,
    4259657740,
    2763975236,
    1272893353,
    4139469664,
    3200236656,
    681279174,
    3936430074,
    3572445317,
    76029189,
    3654602809,
    3873151461,
    530742520,
    3299628645,
    4096336452,
    1126891415,
    2878612391,
    4237533241,
    1700485571,
    2399980690,
    4293915773,
    2240044497,
    1873313359,
    4264355552,
    2734768916,
    1309151649,
    4149444226,
    3174756917,
    718787259,
    3951481745
  ].map((function (t) {
    return 0 | t
  })),
  a = [
    3614090360,
    3905402710,
    606105819,
    3250441966,
    4118548399,
    1200080426,
    2821735955,
    4249261313,
    1770035416,
    2336552879,
    4294925233,
    2304563134,
    1804603682,
    4254626195,
    2792965006,
    1236535329,
    4129170786,
    3225465664,
    643717713,
    3921069994,
    3593408605,
    38016083,
    3634488961,
    3889429448,
    568446438,
    3275163606,
    4107603335,
    1163531501,
    2850285829,
    4243563512,
    1735328473,
    2368359562,
    3654602809,
    3873151461,
    530742520,
    3299628645,
    681279174,
    3936430074,
    3572445317,
    76029189,
    2763975236,
    1272893353,
    4139469664,
    3200236656,
    4294588738,
    2272392833,
    1839030562,
    4259657740,
    4149444226,
    3174756917,
    718787259,
    3951481745,
    1873313359,
    4264355552,
    2734768916,
    1309151649,
    1700485571,
    2399980690,
    4293915773,
    2240044497,
    4096336452,
    1126891415,
    2878612391,
    4237533241
  ].map((function (t) {
    return 0 | t
  })),
  u = [
    [7,
    12,
    17,
    22],
    [
      5,
      9,
      14,
      20
    ],
    [
      4,
      11,
      16,
      23
    ],
    [
      6,
      10,
      15,
      21
    ]
  ],
  s = [
    1732584193,
    - 271733879,
    - 1732584194,
    271733878
  ];
  function f(t, r) {
    return (t >>> 0) / Math.pow(2, 32 - r) | t >>> 0 << r | 0
  }
  function l(t, r, e) {
    return (e ^ r) & t ^ e
  }
  function c(t, r, e) {
    return (t ^ r) & e ^ r
  }
  function _(t, r, e) {
    return r ^ t ^ e
  }
  function h(t, r, e) {
    return (t | ~e) ^ r
  }
  function g(t, r) {
    return t + r | 0
  }
  function v(t, r) {
    return t - r | 0
  }
  function d(t, r, e) {
    return l(t, r, ~e)
  }
  function p(t, r, e) {
    return _(t, ~r, e)
  }
  function y(t, r, e) {
    return h(~t, r, e)
  }
  var m = function () {
    function t(t) {
      this.f1 = v,
      this.f2 = d,
      this.f3 = c,
      this.f4 = p,
      this.f5 = y,
      this.md5table = o,
      this.encBlock = t,
      this.encData = s.slice(),
      this.A = this.encData[0],
      this.B = this.encData[1],
      this.C = this.encData[2],
      this.D = this.encData[3]
    }
    return t.prototype.calculate = function (t, r, e) {
      var n = t(this.B, this.C, this.D);
      return this.A + this.f1(n, this.md5table[e] + this.encBlock[r]) | 0
    },
    t.prototype.incrementData = function () {
      var t = this;
      this.encData[0] += this.A,
      this.encData[1] += this.B,
      this.encData[2] += this.C,
      this.encData[3] += this.D,
      this.encData.forEach((function (r, e) {
        t.encData[e] = 0 | r
      }))
    },
    t.prototype.makeEncode = function () {
      for (var t = 0, r = 0; r < 64; r++) {
        switch (r >> 4) {
          case 0:
            t = this.calculate(this.f2, 15 & r, r);
            break;
          case 1:
            t = this.calculate(this.f3, 5 * r + 1 & 15, r);
            break;
          case 2:
            t = this.calculate(this.f4, 3 * r + 5 & 15, r);
            break;
          case 3:
            t = this.calculate(this.f5, 7 * r & 15, r)
        }
        this.A = this.D,
        this.D = this.C,
        this.C = this.B,
        this.B = f(t, u[r >> 4][3 & r]) + this.B | 0
      }
      this.incrementData()
    },
    t.prototype.result = function () {
      return this.encData.map((function (t) {
        return (0 | t) >>> 0
      }))
    },
    t.encode = function (t) {
      var r = new this(t);
      return r.makeEncode(),
      r.result()
    },
    t
  }(),
  b = function (t) {
    function r() {
      var r = null !== t && t.apply(this, arguments) || this;
      return r.f1 = g,
      r.f2 = l,
      r.f3 = c,
      r.f4 = _,
      r.f5 = h,
      r
    }
    return i(r, t),
    r
  }(m),
  w = function (t) {
    function r() {
      return null !== t && t.apply(this, arguments) || this
    }
    return i(r, t),
    r.prototype.makeEncode = function () {
      for (var r = 0; r < 21; r++) this.A |= 151,
      this.B ^= 8,
      this.C |= 1616929121 - r,
      this.D ^= 1347424272 + r,
      t.prototype.makeEncode.call(this)
    },
    r
  }(m),
  B = function (t) {
    function r() {
      var r = null !== t && t.apply(this, arguments) || this;
      return r.md5table = a,
      r
    }
    return i(r, t),
    r.prototype.makeEncode = function () {
      for (var t = 0, r = 0; r < 17; r++) {
        this.A |= 1048727,
        this.B ^= 655368,
        this.C |= 1616929121 - r,
        this.D ^= 1347424272 + r;
        for (var e = 0; e < 64; e++) {
          switch (e >> 4) {
            case 0:
              t = this.calculate(this.f2, 15 & e, e + 16 | 0);
              break;
            case 1:
              t = this.calculate(this.f3, 5 * e + 1 & 15, e + 32 | 0);
              break;
            case 2:
              t = this.calculate(this.f4, 3 * e + 5 & 15, e - 2 * (12 & e) + 12);
              break;
            case 3:
              t = this.calculate(this.f5, 7 * e & 15, 2 * (3 & e) - (15 & e) + 12)
          }
          this.A = this.D,
          this.D = this.C,
          this.C = this.B,
          this.B = f(t, u[e >> 4][3 & e]) + this.B | 0
        }
        this.incrementData()
      }
      for (r = 0; r < 21; r++) {
        this.A |= 151,
        this.B ^= 8,
        this.C |= 1347424272 - r,
        this.D ^= 1616929121 + r;
        for (e = 0; e < 64; e++) {
          switch (e >> 4) {
            case 0:
              t = this.calculate(this.f4, 3 * e + 5 & 15, 2 * (3 & e) - e + 44);
              break;
            case 1:
              t = this.calculate(this.f5, 7 * e & 15, 2 * (3 & e) - e + 76);
              break;
            case 2:
              t = this.calculate(this.f2, 15 & e, 15 & e | 0);
              break;
            case 3:
              t = this.calculate(this.f3, 5 * e + 1 & 15, e - 32 | 0)
          }
          var n = 2 + (e >> 4);
          this.A = this.D,
          this.D = this.C,
          this.C = this.B,
          this.B = f(t, u[3 & n][3 & e]) + this.B | 0
        }
        this.incrementData()
      }
    },
    r
  }(m),
  D = function (t) {
    function r() {
      var r = null !== t && t.apply(this, arguments) || this;
      return r.md5table = a,
      r.counter1 = 23,
      r
    }
    return i(r, t),
    r.prototype.makeEncode = function () {
      for (var t = 0, r = 0; r < this.counter1; r++) {
        this.A |= 10518679,
        this.B ^= 167840008,
        this.C |= 1616929121 - r,
        this.D ^= 1347424272 + r;
        for (var e = 0; e < 64; e++) {
          var n = (15 & e) - ((12 & e) << 1) + 12;
          switch (e >> 4) {
            case 0:
              t = this.calculate(this.f2, 15 & e, e + 32 | 0);
              break;
            case 1:
              t = this.calculate(this.f3, 5 * e + 1 & 15, 15 & e | 0);
              break;
            case 2:
              t = this.calculate(this.f4, 3 * e + 5 & 15, n + 16 | 0);
              break;
            case 3:
              t = this.calculate(this.f5, 7 * e & 15, n + 48 | 0)
          }
          this.A = this.D,
          this.D = this.C,
          this.C = this.B,
          this.B = f(t, u[e >> 4][3 & e]) + this.B | 0
        }
        this.incrementData()
      }
      for (r = 0; r < 17; r++) {
        this.A |= 1048727,
        this.B ^= 655368,
        this.C |= 1347424272 - r,
        this.D ^= 1616929121 + r;
        for (e = 0; e < 64; e++) {
          n = (15 & e) - ((12 & e) << 1) + 12;
          switch (e >> 4) {
            case 0:
              t = this.calculate(this.f4, 3 * (15 & e) + 5 & 15, n + 16);
              break;
            case 1:
              t = this.calculate(this.f5, 7 * (3 & e) + (12 & e) + 4 & 15, 32 + (15 & e));
              break;
            case 2:
              t = this.calculate(this.f2, 15 & n, n);
              break;
            case 3:
              t = this.calculate(this.f3, 5 * (15 & e) + 1 & 15, 48 + (15 & e))
          }
          var i = 2 + (e >> 4);
          this.A = this.D,
          this.D = this.C,
          this.C = this.B,
          this.B = f(t, u[3 & i][3 & e]) + this.B | 0
        }
        this.incrementData()
      }
    },
    r
  }(m),
  A = {
    '595B': m,
    '2A7B': m,
    A95B: m,
    '1D3B': w,
    D35B: b,
    '1F66': B,
    '6FF1': D,
    '1F5A': function (t) {
      function r() {
        var r = null !== t && t.apply(this, arguments) || this;
        return r.md5table = a,
        r
      }
      return i(r, t),
      r.prototype.incrementData = function () {
        var t = this;
        this.encData[0] += this.B,
        this.encData[1] += this.C,
        this.encData[2] += this.A,
        this.encData[3] += this.D,
        this.encData.forEach((function (r, e) {
          t.encData[e] = 0 | r
        }))
      },
      r.prototype.calculate = function (t, r, e) {
        var n = t(this.C, this.A, this.D);
        return this.B + this.f1(n, this.md5table[e] + this.encBlock[r]) | 0
      },
      r.prototype.makeEncode = function () {
        for (var t = 0, r = 0; r < 5; r++) {
          for (var e = 0; e < 64; e++) {
            var n = 12 + (3 & e) - (12 & e);
            switch (e >> 4) {
              case 0:
                t = this.calculate(this.f2, 15 & e, e);
                break;
              case 1:
                t = this.calculate(this.f3, 5 * e + 1 & 15, e);
                break;
              case 2:
                t = this.calculate(this.f4, 3 * e + 5 & 15, n + 32);
                break;
              case 3:
                t = this.calculate(this.f5, 7 * e & 15, n + 48)
            }
            this.B = this.D,
            this.D = this.A,
            this.A = this.C,
            this.C = f(t, u[e >> 4][3 & e]) + this.C | 0
          }
          this.incrementData()
        }
      },
      r
    }(m),
    BF97: function (t) {
      function r() {
        var r = null !== t && t.apply(this, arguments) || this;
        return r.counter1 = 31,
        r
      }
      return i(r, t),
      r
    }(D)
  };
  function k(t, r) {
    return A[r].encode(t)
  }
},
function (t, r, e) {
  'use strict';
  e.d(r, 'a', (function () {
    return a
  }));
  var n = e(1),
  i = {
    1: '3',
    0: '1',
    3: 'F',
    2: '7',
    5: 'Q',
    4: 'V',
    7: 'X',
    6: 'G',
    9: 'O',
    8: 'U',
    a: 'C',
    c: 'E',
    b: 'P',
    e: 'M',
    d: 'T',
    g: 'H',
    f: '8',
    i: 'Y',
    h: 'Z',
    k: 'S',
    j: 'W',
    m: '4',
    l: 'K',
    o: 'J',
    n: '9',
    q: '5',
    p: '2',
    s: 'N',
    r: 'B',
    u: 'L',
    t: 'A',
    w: 'D',
    v: '6',
    y: 'I',
    x: '4',
    z: '0'
  },
  o = {
    1: '3',
    0: '1',
    3: 'F',
    2: '7',
    5: 'Q',
    4: 'V',
    7: 'X',
    6: 'G',
    9: 'O',
    8: 'U',
    a: 'C',
    c: 'E',
    b: 'P',
    e: 'M',
    d: 'T',
    g: 'H',
    f: '8',
    i: 'Y',
    h: 'Z',
    k: 'S',
    j: 'W',
    m: '4',
    l: 'K',
    o: 'J',
    n: '9',
    q: '5',
    p: '2',
    s: 'N',
    r: 'B',
    u: 'L',
    t: 'A',
    w: 'D',
    v: '6',
    y: 'I',
    x: 'R',
    z: '0'
  };
  var a = Object(n.c) ({
    name: 'hpMini',
    description: 'HP/Compaq Mini Netbooks',
    examples: [
      'CNU1234ABC'
    ],
    inputValidator: function (t) {
      return /^[0-9A-Z]{10}$/i.test(t)
    },
    fun: function (t) {
      var r = '',
      e = '';
      t = t.toLowerCase();
      for (var n = 0; n < t.length; n++) r += i[t.charAt(n)],
      e += o[t.charAt(n)];
      return r === e ? [
        r.toLowerCase()
      ] : [
        r.toLowerCase(),
        e.toLowerCase()
      ]
    }
  })
},
function (t, r, e) {
  'use strict';
  e.d(r, 'a', (function () {
    return i
  }));
  var n = e(1);
  var i = Object(n.c) ({
    name: 'sony',
    description: 'Sony Viejo',
    examples: [
      '1234567'
    ],
    inputValidator: function (t) {
      return /^\d{7}$/i.test(t)
    },
    fun: function (t) {
      var r = function (t) {
        for (var r = '', e = 0; e < t.length; e++) r += '0987654321876543210976543210982109876543109876543221098765436543210987'.charAt(parseInt(t.charAt(e), 10) + 10 * e);
        return r
      }(t);
      return r ? [
        r
      ] : [
      ]
    }
  })
},
function (t, r, e) {
  'use strict';
  e.d(r, 'a', (function () {
    return g
  }));
  var n = e(0),
  i = e.n(n),
  o = e(1),
  a = function (t, r) {
    var e = 'function' == typeof Symbol && t[Symbol.iterator];
    if (!e) return t;
    var n,
    i,
    o = e.call(t),
    a = [
    ];
    try {
      for (; (void 0 === r || r-- > 0) && !(n = o.next()).done; ) a.push(n.value)
    } catch (t) {
      i = {
        error: t
      }
    } finally {
      try {
        n && !n.done && (e = o.return) && e.call(o)
      } finally {
        if (i) throw i.error
      }
    }
    return a
  },
  u = '9DPK7V2F3RT6HX8J',
  s = new RegExp('^[' + u + ']{16}$');
  function f(t) {
    return (t[3] << 24 | t[2] << 16 | t[1] << 8 | t[0]) >>> 0
  }
  function l(t) {
    return [255 & t,
    t >> 8 & 255,
    t >> 16 & 255,
    t >> 24 & 255]
  }
  function c(t, r) {
    var e = a(function t(r, e) {
      if (i.a.EQ(e, 0)) return [i.a.BigInt(1),
      i.a.BigInt(0),
      r];
      var n = a(t(e, i.a.remainder(r, e)), 3),
      o = n[0],
      u = n[1],
      s = n[2];
      return [u,
      i.a.subtract(o, i.a.multiply(u, i.a.divide(r, e))),
      s]
    }(t, r), 3),
    n = e[0],
    o = e[2];
    if (i.a.EQ(o, 1)) {
      var u = i.a.remainder(n, r);
      return i.a.GE(u, 0) ? u : i.a.ADD(u, r)
    }
  }
  function _(t, r, e) {
    var n = i.a.BigInt(1);
    if (e instanceof i.a || (e = i.a.BigInt(e)), i.a.EQ(e, 1)) return 0;
    for (t = i.a.remainder(t, e); r > 0; ) 1 == (1 & r) && (n = i.a.remainder(i.a.multiply(n, t), e)),
    r >>= 1,
    t = i.a.remainder(i.a.multiply(t, t), e);
    return i.a.toNumber(n)
  }
  function h(t) {
    return function (t) {
      for (var r = f(t), e = '', n = 0; n < 8; n++) e += '47592836'.charAt(r >> 21 - 3 * n & 7);
      return e
    }(function (t) {
      var r,
      e = i.a.BigInt(f(t.slice(0, 4))),
      n = i.a.BigInt(f(t.slice(4, 8))),
      o = i.a.bitwiseOr(i.a.leftShift(n, i.a.BigInt(32)), e),
      a = 2795287379,
      u = 3544934711,
      s = i.a.multiply(i.a.BigInt(a - 1), i.a.BigInt(u - 1)),
      h = c(i.a.BigInt(41), s),
      g = i.a.remainder(h, i.a.BigInt(a - 1)),
      v = i.a.remainder(h, i.a.BigInt(u - 1)),
      d = c(i.a.BigInt(u), i.a.BigInt(a)),
      p = _(o, i.a.toNumber(g), a),
      y = _(o, i.a.toNumber(v), u);
      r = p < y ? i.a.remainder(i.a.multiply(i.a.add(i.a.BigInt(p - y), i.a.BigInt(a)), d), i.a.BigInt(a)) : i.a.remainder(i.a.multiply(i.a.BigInt(p - y), d), i.a.BigInt(a));
      var m = i.a.add(i.a.multiply(r, i.a.BigInt(u)), i.a.BigInt(y));
      return l(i.a.toNumber(i.a.asUintN(32, m))).concat(l(i.a.toNumber(i.a.signedRightShift(m, i.a.BigInt(32)))))
    }(function (t) {
      for (var r = [
      ], e = 0; e < t.length; e += 2) r.unshift(16 * u.indexOf(t[e]) + u.indexOf(t[e + 1]));
      return r
    }(t)))
  }
  var g = Object(o.c) ({
    name: 'sony4x4',
    description: 'Sony 4x4',
    examples: [
      '73KR-3FP9-PVKH-K29R'
    ],
    cleaner: function (t) {
      return t.trim().replace(/[-\s]/gi, '').toUpperCase()
    },
    inputValidator: function (t) {
      return s.test(t)
    },
    fun: function (t) {
      var r = h(t);
      return r ? [
        r
      ] : [
      ]
    }
  })
},
function (t, r, e) {
  'use strict';
  e.r(r);
  var n = e(8),
  i = e(9),
  o = function (t, r) {
    var e = 'function' == typeof Symbol && t[Symbol.iterator];
    if (!e) return t;
    var n,
    i,
    o = e.call(t),
    a = [
    ];
    try {
      for (; (void 0 === r || r-- > 0) && !(n = o.next()).done; ) a.push(n.value)
    } catch (t) {
      i = {
        error: t
      }
    } finally {
      try {
        n && !n.done && (e = o.return) && e.call(o)
      } finally {
        if (i) throw i.error
      }
    }
    return a
  },
  a = document.getElementById('form_id'),
  u = document.getElementById('serial_id'),
  s = document.getElementById('try_this'),
  f = document.getElementById('dell_note'),
  l = document.getElementById('answer');
  a.addEventListener('submit', (function (t) {
    t.preventDefault ? t.preventDefault() : t.returnValue = !1,
    l.innerHTML = '';
    var r,
    e,
    a,
    c = (r = u.value, e = Object(i.a) (r), a = {
    }, i.b.forEach((function (t) {
      a[t.biosName] = !1
    })), e.forEach((function (t) {
      var r = o(t, 3),
      e = r[0],
      i = (r[1], r[2]);
      a[e.biosName] = !0,
      Object(n.a) ('event', 'timing_complete', {
        name: 'bios_keygen',
        value: Math.round(i),
        event_category: e.biosName
      })
    })), Object(n.a) ('event', 'bios_keygen', a), e);
    c.length > 0 ? (s.style.display = '', f.style.display = '', function (t) {
      var r = document.createElement('table');
      r.classList.add('answer_table'),
      t.forEach((function (t) {
        var e = o(t, 3),
        n = e[0],
        i = e[1],
        a = (e[2], document.createElement('tr')),
        u = document.createElement('td');
        u.appendChild(document.createTextNode(n.description)),
        a.appendChild(u);
        var s = document.createElement('td');
        i.forEach((function (t, r) {
          r > 0 && s.appendChild(document.createElement('br')),
          s.appendChild(document.createTextNode(t))
        })),
        a.appendChild(s),
        r.appendChild(a)
      })),
      l.appendChild(r)
    }(c)) : (s.style.display = 'none', f.style.display = 'none')
  }), !0)
}
]);
//# sourceMappingURL=bundle.a78196a367a7a9367132.js.map
