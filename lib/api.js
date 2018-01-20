const	_			=	require( "lodash" ),
		crypto		=	require( "crypto" );

module.exports	=	class {
	/**
	 * 检测对象是否为空
	 * @param	{any}	obj		检测对象
	 */
	static isNull( obj ){
		return _.isNull( obj ) || _.isUndefined( obj );
	}

	/**
	 * 检测对象内部是否为空
	 * @param	{object}	obj		检测对象
	 */
	static isEmpty( obj ){
		return _.isEmpty( obj );
	}

	/**
	 * 对象内部属性排序，按照ASCII
	 * @param	{object}	obj		排序对象
	 */
	static objectSort( obj ){
		let newObj	=	{};
		_( obj ).keys().sort().value().forEach( o => {
			newObj[ o ]	=	obj[ o ];
		});
		return newObj;
	}

	/**
	 * 随机数字
	 * @param	{integer}	lower		最小数
	 * @param	{integer}	upper		最大数
	 * @param	{boolean}	float		是否浮点数
	 */
	static random( lower = 0, upper = 1, float = false ){
		return _.random( lower, upper, float );
	}

	/**
	 * 随机字符串，由a-zA-Z0-9产生
	 * @param	{integer}	len			字符串长度
	 * @param	{integer}	type		随机字符类型
	 */
	static randomString( len = 32, type = "char" ){
		let numbers, charsLower, charsUpper, hexChars, chars, charsLen, maxByte,
			rdmStr, buf, rdmByte;
		numbers		=	"0123456789";
		charsLower	=	"abcdefghijklmnopqrstuvwxyz";
		charsUpper	=	charsLower.toUpperCase();
		hexChars	=	"abcdef";
		switch( type ){
			case "number":
				chars	=	numbers;
			break;

			case "char":
				chars	=	numbers + charsLower + charsUpper;
			break;

			case "hex":
				chars	=	numbers + hexChars;
			break;

			default:
				chars	=	numbers + charsLower + charsUpper;
			break;
		}
		charsLen	=	chars.length;
		maxByte		=	256 - ( 256 % charsLen );
		rdmStr		=	"";
		while( len > 0 ){
			buf		=	crypto.randomBytes( Math.ceil( len * 256 / maxByte ) );
			for( let i = 0; i < buf.length && len > 0; i++ ){
				rdmByte		=	buf.readUInt8( i );
				if( rdmByte < maxByte ){
					rdmStr	+=	chars.charAt( rdmByte % charsLen );
					len--;
				}
			}
		}
		return rdmStr;
	}

	static hexToDec( hexStr ){
		hexStr	=	hexStr.toLowerCase();
		return convertBase( hexStr, 16, 10 );
		function convertBase( str, fromBase, toBase ){
			let digits, outArray, power, i, out;
			digits		=	parseToDigitsArray( str, fromBase );
			if( digits === null ){
				return null;
			}
			outArray	=	[];
			power		=	[ 1 ];
			for( i = 0; i < digits.length; i++ ){
				// invariant: at this point, fromBase^i = power
				if( digits[ i ] ){
					outArray = add( outArray, multiplyByNumber( digits[ i ], power, toBase ), toBase );
				}
				power	=	multiplyByNumber( fromBase, power, toBase );
			}
			out		=	"";
			for( i = outArray.length - 1; i >= 0; i-- ){
				out	+=	outArray[ i ].toString( toBase );
			}
			return out;
		}
		function parseToDigitsArray( str, base ){
			let digits, ary, i, n;
			digits	=	str.split( "" );
			ary		=	[];
			for( i = digits.length - 1; i >= 0; i-- ){
				n	=	parseInt( digits[ i ], base );
				if( isNaN( n ) ){
					return null;
				}
				ary.push( n );
			}
			return ary;
		}
		function add( x, y, base ){
			let z, n, carry, i, xi, yi, zi;
			z		=	[];
			n		=	Math.max(x.length, y.length);
			carry	=	0;
			i		=	0;
			while( i < n || carry ){
				xi	=	i < x.length ? x[ i ] : 0;
				yi	=	i < y.length ? y[ i ] : 0;
				zi	=	carry + xi + yi;
				z.push( zi % base );
				carry	=	Math.floor( zi / base );
				i++;
			}
			return z;
		}
		function multiplyByNumber( num, x, base ){
			if (num < 0){
				return null;
			}
			if (num === 0){
				return [];
			}
			let result, power;
			result	=	[];
			power	=	x;
			while( true ){
				if( num & 1 ){
					result = add( result, power, base );
				}
				num		=	num >> 1;
				if( num === 0 ){
					break;
				}
				power	=	add( power, power, base );
			}
			return result;
		}
	}
};
