/ *！
 * jQuery JavaScript Library v1.12.4
 * http://jquery.com/
 *
 *包括Sizzle.js
 * http://sizzlejs.com/
 *
 *版权jQuery Foundation和其他贡献者
 *根据MIT许可证发布
 * http://jquery.org/license
 *
 *日期：2016-05-20T17：17Z
 * /

（功能（全球，工厂）{

	if（typeof module ===“object”&& typeof module.exports ===“object”）{
		//适用于CommonJS和类似CommonJS的环境，其中有一个正确的“窗口”
		//存在，执行工厂并获取jQuery。
		//对于没有带“文档”的“窗口”的环境
		//（例如Node.js），将工厂公开为module.exports。
		//这突出了创建一个真正的“窗口”的需要。
		//例如var jQuery = require（“jquery”）（window）;
		//有关详细信息，请参阅＃14549票。
		module.exports = global.document？
			工厂（全球，真实）：
			function（w）{
				if（！w.document）{
					抛出新错误（“jQuery需要一个带文档的窗口”）;
				}
				返厂（w）;
			};
	} else {
		工厂（全球）;
	}

//如果尚未定义窗口，请传递此项
}（typeof window！==“undefined”？window：this，function（window，noGlobal）{

//支持：Firefox 18+
//不能在严格模式下，包括ASP.NET跟踪在内的几个库
//堆栈通过arguments.caller.callee和Firefox死掉if
//你试图追踪“使用严格”的调用链。（＃13335）
//“使用严格”;
var deletedIds = [];

var document = window.document;

var slice = deletedIds.slice;

var concat = deletedIds.concat;

var push = deletedIds.push;

var indexOf = deletedIds.indexOf;

var class2type = {};

var toString = class2type.toString;

var hasOwn = class2type.hasOwnProperty;

var support = {};



VAR
	version =“1.12.4”，

	//定义jQuery的本地副本
	jQuery = function（selector，context）{

		// jQuery对象实际上只是init构造函数'enhanced'
		//如果调用了jQuery，则需要init（如果不包含则只允许抛出错误）
		返回新的jQuery.fn.init（selector，context）;
	}，

	//支持：Android <4.1，IE <9
	//确保我们修剪BOM和NBSP
	rtrim = / ^ [\ s \ uFEFF \ xA0] + | [\ s \ uFEFF \ xA0] + $ / g，

	//匹配破折号的字符串
	rmsPrefix = / ^  -  ms- /，
	rdashAlpha = /  - （[\ da-z]）/ gi，

	//由jQuery.camelCase用作replace（）的回调
	fcamelCase = function（all，letter）{
		return letter.toUpperCase（）;
	};

jQuery.fn = jQuery.prototype = {

	//正在使用的jQuery的当前版本
	jquery：版本，

	构造函数：jQuery，

	//从空选择器开始
	选择器：“”，

	// jQuery对象的默认长度为0
	长度：0，

	toArray：function（）{
		return slice.call（this）;
	}，

	//获取匹配元素集OR中的第N个元素
	//将整个匹配的元素集作为干净数组
	get：function（num）{
		return num！= null？

			//只返回集合中的一个元素
			（num <0？this [num + this.length]：this [num]）：

			//返回干净数组中的所有元素
			slice.call（this）;
	}，

	//获取一系列元素并将其推入堆栈
	//（返回新的匹配元素集）
	pushStack：function（elems）{

		//构建一个新的jQuery匹配元素集
		var ret = jQuery.merge（this.constructor（），elems）;

		//将旧对象添加到堆栈中（作为参考）
		ret.prevObject = this;
		ret.context = this.context;

		//返回新形成的元素集
		返回;
	}，

	//对匹配集中的每个元素执行回调。
	each：function（callback）{
		return jQuery.each（this，callback）;
	}，

	map：function（callback）{
		return this.pushStack（jQuery.map（this，function（elem，i）{
			return callback.call（elem，i，elem）;
		}）;;
	}，

	slice：function（）{
		return this.pushStack（slice.apply（this，arguments））;
	}，

	第一名：function（）{
		return this.eq（0）;
	}，

	last：function（）{
		return this.eq（-1）;
	}，

	eq：function（i）{
		var len = this.length，
			j = + i +（i <0？len：0）;
		return this.pushStack（j> = 0 && j <len？[this [j]]：[]）;
	}，

	结束：function（）{
		返回this.prevObject || this.constructor（）;
	}，

	// 仅限内部使用。
	//表现得像一个Array的方法，而不是像jQuery方法。
	推推，
	sort：deletedIds.sort，
	splice：deletedIds.splice
};

jQuery.extend = jQuery.fn.extend = function（）{
	var src，copyIsArray，copy，name，options，clone，
		target = arguments [0] || {}，
		i = 1，
		length = arguments.length，
		deep = false;

	//处理深层复制情况
	if（typeof target ===“boolean”）{
		deep = target;

		//跳过布尔值和目标
		target = arguments [i] || {};
		我++;
	}

	//当目标是字符串或其他东西时处理大小写（可能在深层副本中）
	if（typeof target！==“object”&&！jQuery.isFunction（target））{
		target = {};
	}

	//如果只传递一个参数，则扩展jQuery本身
	if（i === length）{
		target = this;
		一世 - ;
	}

	for（; i <length; i ++）{

		//仅处理非null /未定义的值
		if（（options = arguments [i]）！= null）{

			//扩展基础对象
			for（选项中的名称）{
				src = target [name];
				copy = options [name];

				//防止永无止境的循环
				if（target === copy）{
					继续;
				}

				//如果我们要合并普通对象或数组，请递归
				if（deep && copy &&（jQuery.isPlainObject（copy）||
					（copyIsArray = jQuery.isArray（copy））））{

					if（copyIsArray）{
						copyIsArray = false;
						clone = src && jQuery.isArray（src）？src：[];

					} else {
						clone = src && jQuery.isPlainObject（src）？src：{};
					}

					//永远不要移动原始对象，克隆它们
					target [name] = jQuery.extend（deep，clone，copy）;

				//不要引入未定义的值
				} else if（copy！== undefined）{
					target [name] = copy;
				}
			}
		}
	}

	//返回修改后的对象
	回归目标;
};

jQuery.extend（{

	//对于页面上的每个jQuery副本都是唯一的
	expando：“jQuery”+（version + Math.random（））.replace（/ \ D / g，“”），

	//假设jQuery没有就绪模块就准备好了
	isReady：是的，

	错误：function（msg）{
		抛出新错误（msg）;
	}，

	noop：function（）{}，

	//有关isFunction的详细信息，请参阅test / unit / core.js。
	//从版本1.3开始，DOM方法和函数如alert
	//不受支持。它们在IE上返回false（＃2968）。
	isFunction：function（obj）{
		return jQuery.type（obj）===“function”;
	}，

	isArray：Array.isArray || function（obj）{
		return jQuery.type（obj）===“array”;
	}，

	isWindow：function（obj）{
		/ * jshint eqeqeq：false * /
		return obj！= null && obj == obj.window;
	}，

	isNumeric：function（obj）{

		// parseFloat NaNs数值投射误报（null | true | false |“”）
		// ...但是误解了前导数字符串，尤其是十六进制文字（“0x ...”）
		//减法迫使NaN无穷大
		//添加1可纠正parseFloat（＃15100）的精度损失
		var realStringObj = obj && obj.toString（）;
		return！jQuery.isArray（obj）&&（realStringObj  -  parseFloat（realStringObj）+ 1）> = 0;
	}，

	isEmptyObject：function（obj）{
		var name;
		for（obj中的名字）{
			返回false;
		}
		返回true;
	}，

	isPlainObject：function（obj）{
		var键;

		//必须是一个对象。
		//由于IE，我们还必须检查构造函数属性的存在。
		//确保DOM节点和窗口对象也不会通过
		if（！obj || jQuery.type（obj）！==“object”|| obj.nodeType || jQuery.isWindow（obj））{
			返回false;
		}

		尝试{

			//不是自己的构造函数属性必须是Object
			if（obj.constructor &&
				！hasOwn.call（obj，“constructor”）&&
				！hasOwn.call（obj.constructor.prototype，“isPrototypeOf”））{
				返回false;
			}
		} catch（e）{

			// IE8,9将在某些主机对象上抛出异常＃9897
			返回false;
		}

		//支持：IE <9
		//在自己的属性之前处理对继承属性的迭代。
		if（！support.ownFirst）{
			for（key in obj）{
				return hasOwn.call（obj，key）;
			}
		}

		//首先列举自己的属性，以便加快速度，
		//如果最后一个属于自己，那么所有属性都是自己的。
		for（key in obj）{}

		返回键=== undefined || hasOwn.call（obj，key）;
	}，

	type：function（obj）{
		if（obj == null）{
			return obj +“”;
		}
		return typeof obj ===“object”|| typeof obj ===“功能”？
			class2type [toString.call（obj）] || “对象”：
			对象类型;
	}，

	//基于Jim Driscoll的调查结果的变通方法
	// http://weblogs.java.net/blog/driscoll/archive/2009/09/08/eval-javascript-global-context
	globalEval：function（data）{
		if（data && jQuery.trim（data））{

			//我们在Internet Explorer上使用execScript
			//我们使用匿名函数，以便上下文是窗口
			//而不是Firefox中的jQuery
			（window.execScript || function（data）{
				window [“eval”] .call（window，data）; // jscs：忽略requireDotNotation
			}）（数据）;
		}
	}，

	//将虚线转换为camelCase; 由css和数据模块使用
	//微软忘了驼背他们的供应商前缀（＃9572）
	camelCase：function（string）{
		return string.replace（rmsPrefix，“ms-”）.replace（rdashAlpha，fcamelCase）;
	}，

	nodeName：function（elem，name）{
		return elem.nodeName && elem.nodeName.toLowerCase（）=== name.toLowerCase（）;
	}，

	each：function（obj，callback）{
		var length，i = 0;

		if（isArrayLike（obj））{
			length = obj.length;
			for（; i <length; i ++）{
				if（callback.call（obj [i]，i，obj [i]）=== false）{
					打破;
				}
			}
		} else {
			for（i in obj）{
				if（callback.call（obj [i]，i，obj [i]）=== false）{
					打破;
				}
			}
		}

		返回obj;
	}，

	//支持：Android <4.1，IE <9
	trim：function（text）{
		return text == null？
			“”：
			（text +“”）。replace（rtrim，“”）;
	}，

	//结果仅供内部使用
	makeArray：function（arr，results）{
		var ret = results || [];

		if（arr！= null）{
			if（isArrayLike（Object（arr）））{
				jQuery.merge（ret，
					typeof arr ===“string”？
					[arr]：arr
				）;
			} else {
				push.call（ret，arr）;
			}
		}

		返回;
	}，

	inArray：function（elem，arr，i）{
		var len;

		if（arr）{
			if（indexOf）{
				return indexOf.call（arr，elem，i）;
			}

			len = arr.length;
			我=我？我<0？Math.max（0，len + i）：i：0;

			for（; i <len; i ++）{

				//在稀疏数组中跳过访问
				if（我在arr && arr [i] === elem）{
					回归我;
				}
			}
		}

		返回-1;
	}，

	合并：功能（第一，第二）{
		var len = + second.length，
			j = 0，
			i = first.length;

		while（j <len）{
			first [i ++] = second [j ++];
		}

		//支持：IE <9
		//在其他arraylike对象（例如，NodeLists）上将.length转换为NaN
		if（len！== len）{
			while（second [j]！== undefined）{
				first [i ++] = second [j ++];
			}
		}

		first.length = i;

		先回来;
	}，

	grep：function（elems，callback，invert）{
		var callbackInverse，
			matches = []，
			i = 0，
			length = elems.length，
			callbackExpect =！invert;

		//浏览数组，只保存项目
		//传递验证器函数
		for（; i <length; i ++）{
			callbackInverse =！callback（elems [i]，i）;
			if（callbackInverse！== callbackExpect）{
				matches.push（elems [i]）;
			}
		}

		回归比赛;
	}，

	// arg仅供内部使用
	map：function（elems，callback，arg）{
		var length，value，
			i = 0，
			ret = [];

		//浏览数组，将每个项目转换为新值
		if（isArrayLike（elems））{
			length = elems.length;
			for（; i <length; i ++）{
				value = callback（elems [i]，i，arg）;

				if（value！= null）{
					ret.push（value）;
				}
			}

		//浏览对象上的每个键，
		} else {
			for（i in elems）{
				value = callback（elems [i]，i，arg）;

				if（value！= null）{
					ret.push（value）;
				}
			}
		}

		//展平任何嵌套数组
		return concat.apply（[]，ret）;
	}，

	//对象的全局GUID计数器
	guid：1，

	//将函数绑定到上下文，可选择部分应用任何函数
	//参数
	proxy：function（fn，context）{
		var args，proxy，tmp;

		if（typeof context ===“string”）{
			tmp = fn [context];
			context = fn;
			fn = tmp;
		}

		//在规范中快速检查以确定目标是否可调用
		//这会抛出一个TypeError，但我们只返回undefined。
		if（！jQuery.isFunction（fn））{
			返回undefined;
		}

		//模拟绑定
		args = slice.call（arguments，2）;
		proxy = function（）{
			return fn.apply（context || this，args.concat（slice.call（arguments）））;
		};

		//将唯一处理程序的guid设置为原始处理程序的guid，以便可以将其删除
		proxy.guid = fn.guid = fn.guid || jQuery.guid ++;

		返回代理;
	}，

	now：function（）{
		return +（new Date（））;
	}，

	// jQuery.support未在Core中使用，但其他项目附加了它们
	//它的属性所以它需要存在。
	支持：支持
}）;

//由于未在ES5中定义符号，JSHint会在此代码上出错。
//在.jshintrc中定义此全局会产生使用全局的危险
//在另一个地方无人看守，为这些禁用JSHint似乎更安全
//三条线
/ * jshint ignore：start * /
if（typeof Symbol ===“function”）{
	jQuery.fn [Symbol.iterator] = deletedIds [Symbol.iterator];
}
/ * jshint ignore：end * /

//填充class2type映射
jQuery.each（“布尔值数字字符串函数数组日期RegExp对象错误符号”.split（“”），
function（i，name）{
	class2type [“[object”+ name +“]”] = name.toLowerCase（）;
}）;

function isArrayLike（obj）{

	//支持：iOS 8.2（在模拟器中不可重现）
	//`in`检查用于防止JIT错误（gh-2145）
	//由于漏报，因此不使用hasOwn
	//关于IE中的Nodelist长度
	在obj && obj.length中，var length = !! obj &&“length”，
		type = jQuery.type（obj）;

	if（type ===“function”|| jQuery.isWindow（obj））{
		返回false;
	}

	返回类型===“数组”|| 长度=== 0 ||
		typeof length ===“number”&& length> 0 &&（length  -  1）in obj;
}
var Sizzle =
/ *！
 * Sizzle CSS Selector Engine v2.2.1
 * http://sizzlejs.com/
 *
 *版权jQuery Foundation和其他贡献者
 *根据MIT许可证发布
 * http://jquery.org/license
 *
 *日期：2015-10-17
 * /
（功能（窗口）{

var i，
	支持，
	EXPR，
	gettext的，
	isXML，
	记号化，
	编译，
	选择，
	outermostContext，
	sortInput，
	hasDuplicate，

	//本地文档变量
	setDocument，
	文献，
	docElem，
	documentIsHTML，
	rbuggyQSA，
	rbuggyMatches，
	火柴，
	包含，

	//特定于实例的数据
	expando =“sizzle”+ 1 * new Date（），
	preferredDoc = window.document，
	dirruns = 0，
	完成= 0，
	classCache = createCache（），
	tokenCache = createCache（），
	compilerCache = createCache（），
	sortOrder = function（a，b）{
		if（a === b）{
			hasDuplicate = true;
		}
		返回0;
	}，

	//通用常量
	MAX_NEGATIVE = 1 << 31，

	//实例方法
	hasOwn =（{}）。hasOwnProperty，
	arr = []，
	pop = arr.pop，
	push_native = arr.push，
	push = arr.push，
	slice = arr.slice，
	//使用精简的indexOf，因为它比本机更快
	// http://jsperf.com/thor-indexof-vs-for/5
	indexOf = function（list，elem）{
		var i = 0，
			len = list.length;
		for（; i <len; i ++）{
			if（list [i] === elem）{
				回归我;
			}
		}
		返回-1;
	}，

	booleans =“checked | selected | async | autofocus | autoplay | controls | defer | disabled | hidden | ismap | loop | multiple | open | readonly | required | scoped”，

	// 常用表达

	// http://www.w3.org/TR/css3-selectors/#whitespace
	whitespace =“[\\ x20 \\ t \\ r \\ n \\ f]”，

	// http://www.w3.org/TR/CSS21/syndata.html#value-def-identifier
	identifier =“（？：\\\\。| [\\ w-] | [^ \\ x00  -  \\ xa0]）+”，

	//属性选择器：http：//www.w3.org/TR/selectors/#attribute-selectors
	attributes =“\\ [”+ whitespace +“*（”+ identifier +“）（？：”+ whitespace +
		//运算符（捕获2）
		“*（[* ^ $ |！〜]？=）”+空白+
		//“属性值必须是CSS标识符[capture 5]或字符串[capture 3或capture 4]”
		“*（？： '（（？：\\\\ | [^ \\\\']）*）'| \ “（（？：\\\\ | [^ \\\\\”] ）*）\“|（”+标识符+“））|）”+空白+
		“* \\]”，

	pseudos =“:(”+ identifier +“）（？：\\（（”+
		//要减少preFilter中需要tokenize的选择器数量，请更喜欢参数：
		// 1.引用（捕获3;捕获4或捕获5）
		“（ '（（？：\\\\ | [^ \\\\']）*）'| \ “（（？：\\\\ | [^ \\\\\”]）*） \“）|”+
		// 2.简单（捕获6）
		“（（？：\\\\。| [^ \\\\（）[\\]] |”+属性+“）*）|” +
		// 3.其他任何东西（捕获2）
		“。*”+
		“）\\）|）”，

	//前导和非转义尾随空格，捕获后者之前的一些非空白字符
	rwhitespace = new RegExp（空格+“+”，“g”），
	rtrim = new RegExp（“^”+ whitespace +“+ |（（？：^ | [^ \\\\]）（？：\\\\。）*）”+ whitespace +“+ $”，“g “），

	rcomma = new RegExp（“^”+ whitespace +“*，”+ whitespace +“*”），
	rcombinators = new RegExp（“^”+ whitespace +“*（[> +〜] |”+ whitespace +“）”+ whitespace +“*”），

	rattributeQuotes = new RegExp（“=”+ whitespace +“*（[^ \\]'\”] *？）“+ whitespace +”* \\]“，”g“），

	rpseudo =新的RegExp（伪），
	ridentifier = new RegExp（“^”+ identifier +“$”），

	matchExpr = {
		“ID”：新的RegExp（“^＃（”+ + identifier +“）”），
		“CLASS”：新的RegExp（“^ \\。（”+ identifier +“）”），
		“TAG”：新的RegExp（“^（”+ identifier +“| [*]）”），
		“ATTR”：新的RegExp（“^”+属性），
		“PSEUDO”：新的RegExp（“^”+ pseudos），
		“CHILD”：新的RegExp（“^ :(仅|第一|最后|第n |第n  - 最后） - （子类型）（？：\\（”+ + whitespace +
			“*（偶数|奇数|（（[+  - ] |）（\\ d *）n |）”+空格+“*（？：（[+  - ] |）”+空白+
			“*（\\ d +）|））”+ whitespace +“* \\）|）”，“i”），
		“bool”：新的RegExp（“^（？：”+ booleans +“）$”，“i”），
		//用于实现.is（）的库
		//我们在`select`中使用它进行POS匹配
		“needsContext”：新的RegExp（“^”+空格+“* [> +〜] | :(偶数|奇数| eq | gt | lt | nth | first | last）（？：\\（”+
			空格+“*（（？： -  \\ d）？\\ d *）”+空格+“* \\）|）（？= [^  - ] | $）”，“i”）
	}，

	rinputs = / ^（？：input | select | textarea | button）$ / i，
	rheader = / ^ h \ d $ / i，

	rnative = / ^ [^ {] + \ {\ s * \ [native \ w /，

	//易于解析/可检索的ID或TAG或CLASS选择器
	rquickExpr = /^(?:#([\w-]+)|(\w+)|\ .( [.w-]+))$/,

	rsibling = / [+〜] /，
	rescape = /'| \\ / g，

	// CSS逃脱http://www.w3.org/TR/CSS21/syndata.html#escaped-characters
	runescape = new RegExp（“\\\\（[\\ da-f] {1,6}”+空格+“？（|”+空格+“）|。）”，“ig”），
	funescape = function（_，escaped，escapedWhitespace）{
		var high =“0x”+转义 -  0x10000;
		// NaN表示非代码点
		//支持：Firefox <24
		//解决错误的数字解释+“0x”
		返回高！==高|| 逃过白天？
			逃脱：
			高<0？
				// BMP代码点
				String.fromCharCode（high + 0x10000）：
				//补充平面代码点（代理对）
				String.fromCharCode（high >> 10 | 0xD800，high＆0x3FF | 0xDC00）;
	}，

	//用于iframe
	//请参阅setDocument（）
	//删除函数包装导致“权限被拒绝”
	// IE中的错误
	unloadHandler = function（）{
		setDocument（）;
	};

//优化push.apply（_，NodeList）
尝试{
	push.apply（
		（arr = slice.call（preferredDoc.childNodes）），
		preferredDoc.childNodes
	）;
	//支持：Android <4.0
	//无声地检测到push.apply失败
	arr [preferredDoc.childNodes.length] .nodeType;
} catch（e）{
	push = {apply：arr.length？

		//如果可能，利用切片
		function（target，els）{
			push_native.apply（target，slice.call（els））;
		}：

		//支持：IE <9
		//否则直接附加
		function（target，els）{
			var j = target.length，
				i = 0;
			//不能信任NodeList.length
			while（（target [j ++] = els [i ++]））{}
			target.length = j  -  1;
		}
	};
}

function Sizzle（选择器，上下文，结果，种子）{
	var m，i，elem，nid，nidselect，match，groups，newSelector，
		newContext = context && context.ownerDocument，

		// nodeType默认为9，因为上下文默认为document
		nodeType = context？context.nodeType：9;

	结果=结果|| [];

	//从无效选择器或上下文的调用中提前返回
	if（typeof selector！==“string”||！selector ||
		nodeType！== 1 && nodeType！== 9 && nodeType！== 11）{

		返回结果;
	}

	//尝试在HTML文档中快捷查找操作（而不是过滤器）
	if（！seed）{

		if（（context？context.ownerDocument || context：preferredDoc）！== document）{
			setDocument（context）;
		}
		context = context || 文献;

		if（documentIsHTML）{

			//如果选择器足够简单，请尝试使用“get * By *”DOM方法
			//（除了DocumentFragment上下文，其中方法不存在）
			if（nodeType！== 11 &&（match = rquickExpr.exec（selector）））{

				// ID选择器
				if（（m = match [1]））{

					//文档上下文
					if（nodeType === 9）{
						if（（elem = context.getElementById（m）））{

							//支持：IE，Opera，Webkit
							// TODO：识别版本
							// getElementById可以按名称而不是ID匹配元素
							if（elem.id === m）{
								results.push（elem）;
								返回结果;
							}
						} else {
							返回结果;
						}

					//元素上下文
					} else {

						//支持：IE，Opera，Webkit
						// TODO：识别版本
						// getElementById可以按名称而不是ID匹配元素
						if（newContext &&（elem = newContext.getElementById（m））&&
							包含（context，elem）&&
							elem.id === m）{

							results.push（elem）;
							返回结果;
						}
					}

				//类型选择器
				} else if（match [2]）{
					push.apply（results，context.getElementsByTagName（selector））;
					返回结果;

				//类选择器
				} else if（（m = match [3]）&& support.getElementsByClassName &&
					context.getElementsByClassName）{

					push.apply（results，context.getElementsByClassName（m））;
					返回结果;
				}
			}

			//利用querySelectorAll
			if（support.qsa &&
				！compilerCache [selector +“”] &&
				（！rbuggyQSA ||！rbuggyQSA.test（selector）））{

				if（nodeType！== 1）{
					newContext = context;
					newSelector = selector;

				// qSA查看Element上下文，这不是我们想要的
				//感谢Andrew Dupont提供的这种解决方法
				//支持：IE <= 8
				//排除对象元素
				} else if（context.nodeName.toLowerCase（）！==“object”）{

					//捕获上下文ID，必要时先设置它
					if（（nid = context.getAttribute（“id”）））{
						nid = nid.replace（rescape，“\\ $＆”）;
					} else {
						context.setAttribute（“id”，（nid = expando））;
					}

					//在列表中添加每个选择器的前缀
					groups = tokenize（selector）;
					i = groups.length;
					nidselect = ridentifier.test（nid）？“＃”+ nid：“[id ='”+ nid +“']”;
					当我 -  ） {
						groups [i] = nidselect +“”+ toSelector（groups [i]）;
					}
					newSelector = groups.join（“，”）;

					//展开兄弟选择器的上下文
					newContext = rsibling.test（selector）&& testContext（context.parentNode）||
						上下文;
				}

				if（newSelector）{
					尝试{
						push.apply（结果，
							newContext.querySelectorAll（newSelector）
						）;
						返回结果;
					} catch（qsaError）{
					} finally {
						if（nid === expando）{
							context.removeAttribute（“id”）;
						}
					}
				}
			}
		}
	}

	// 所有其他人
	return select（selector.replace（rtrim，“$ 1”），context，results，seed）;
}

/ **
 *创建有限大小的键值缓存
 * @returns {function（string，object）}将对象数据存储在自身后，返回它
 *属性名称（带空格的）字符串和（如果缓存大于Expr.cacheLength）
 *删除最旧的条目
 * /
function createCache（）{
	var keys = [];

	function cache（key，value）{
		//使用（键+“”）避免与本机原型属性冲突（请参阅问题＃157）
		if（keys.push（key +“”）> Expr.cacheLength）{
			//仅保留最新的条目
			delete cache [keys.shift（）];
		}
		return（cache [key +“”] = value）;
	}
	返回缓存;
}

/ **
 *标记Sizzle特殊用途的功能
 * @param {Function} fn标记的功能
 * /
function markFunction（fn）{
	fn [expando] = true;
	返回fn;
}

/ **
 *支持使用元素进行测试
 * @param {Function} fn传递创建的div并期望一个布尔结果
 * /
function assert（fn）{
	var div = document.createElement（“div”）;

	尝试{
		return !! fn（div）;
	} catch（e）{
		返回false;
	} finally {
		//默认情况下从其父项中删除
		if（div.parentNode）{
			div.parentNode.removeChild（div）;
		}
		//在IE中释放内存
		div = null;
	}
}

/ **
 *为所有指定的attrs添加相同的处理程序
 * @param {String} attrs以管道分隔的属性列表
 * @param {Function} handler将应用的方法
 * /
function addHandle（attrs，handler）{
	var arr = attrs.split（“|”），
		i = arr.length;

	当我 -  ） {
		Expr.attrHandle [arr [i]] =处理程序;
	}
}

/ **
 *检查两个兄弟姐妹的文件顺序
 * @param {Element} a
 * @param {Element} b
 * @returns {Number}如果a在b之前，则返回小于0，如果a跟随b，则返回大于0
 * /
function siblingCheck（a，b）{
	var cur = b && a，
		diff = cur && a.nodeType === 1 && b.nodeType === 1 &&
			（~b.sourceIndex || MAX_NEGATIVE） - 
			（~a.sourceIndex || MAX_NEGATIVE）;

	//如果在两个节点上都可用，则使用IE sourceIndex
	if（diff）{
		返回差异;
	}

	//检查b是否跟随a
	if（cur）{
		while（（cur = cur.nextSibling））{
			if（cur === b）{
				返回-1;
			}
		}
	}

	回来了？1：-1;
}

/ **
 *返回在伪输入中用于输入类型的函数
 * @param {String}类型
 * /
function createInputPseudo（type）{
	return函数（elem）{
		var name = elem.nodeName.toLowerCase（）;
		返回名称===“输入”&& elem.type === type;
	};
}

/ **
 *返回一个用于按钮的伪函数
 * @param {String}类型
 * /
function createButtonPseudo（type）{
	return函数（elem）{
		var name = elem.nodeName.toLowerCase（）;
		return（name ===“input”|| name ===“button”）&& elem.type === type;
	};
}

/ **
 *返回一个在pseudos中用于定位的函数
 * @param {Function} fn
 * /
function createPositionalPseudo（fn）{
	return markFunction（function（argument）{
		argument = + argument;
		return markFunction（function（seed，matches）{
			var j，
				matchIndexes = fn（[]，seed.length，argument），
				i = matchIndexes.length;

			//匹配在指定索引处找到的元素
			当我 -  ） {
				if（seed [（j = matchIndexes [i]）]）{
					seed [j] =！（匹配[j] = seed [j]）;
				}
			}
		}）;
	}）;
}

/ **
 *检查节点的有效性作为Sizzle上下文
 * @param {Element | Object =}上下文
 * @returns {Element | Object | Boolean}输入节点（如果可接受），否则为假值
 * /
function testContext（context）{
	return context && typeof context.getElementsByTagName！==“undefined”&& context;
}

//为方便起见，公开支持变量
support = Sizzle.support = {};

/ **
 *检测XML节点
 * @param {Element | Object} elem元素或文档
 * @returns {Boolean}如果iff elem是非HTML XML节点，则为true
 * /
isXML = Sizzle.isXML = function（elem）{
	//对于尚未存在的情况，会验证documentElement
	//（例如在IE中加载iframe  - ＃4833）
	var documentElement = elem &&（elem.ownerDocument || elem）.documentElement;
	return documentElement？documentElement.nodeName！==“HTML”：false;
};

/ **
 *根据当前文档设置一次与文档相关的变量
 * @param {Element | Object} [doc]用于设置文档的元素或文档对象
 * @returns {Object}返回当前文档
 * /
setDocument = Sizzle.setDocument = function（node）{
	var hasCompare，parent，
		doc = node？node.ownerDocument || node：preferredDoc;

	//如果doc无效或已经选中，则提前返回
	if（doc === document || doc.nodeType！== 9 ||！doc.documentElement）{
		退货文件;
	}

	//更新全局变量
	document = doc;
	docElem = document.documentElement;
	documentIsHTML =！isXML（document）;

	//支持：IE 9-11，Edge
	//卸载后访问iframe文档会抛出“权限被拒绝”错误（jQuery＃13936）
	if（（parent = document.defaultView）&& parent.top！== parent）{
		//支持：IE 11
		if（parent.addEventListener）{
			parent.addEventListener（“unload”，unloadHandler，false）;

		//支持：仅限IE 9  -  10
		} else if（parent.attachEvent）{
			parent.attachEvent（“onunload”，unloadHandler）;
		}
	}

	/ *属性
	-------------------------------------------------- -------------------- * /

	//支持：IE <8
	//确认getAttribute确实返回属性而不是属性
	//（IE8布尔除外）
	support.attributes = assert（function（div）{
		div.className =“i”;
		return！div.getAttribute（“className”）;
	}）;

	/ * getElement（s）By *
	-------------------------------------------------- -------------------- * /

	//检查getElementsByTagName（“*”）是否仅返回元素
	support.getElementsByTagName = assert（function（div）{
		div.appendChild（document.createComment（“”））;
		return！div.getElementsByTagName（“*”）。length;
	}）;

	//支持：IE <9
	support.getElementsByClassName = rnative.test（document.getElementsByClassName）;

	//支持：IE <10
	//检查getElementById是否按名称返回元素
	//破坏的getElementById方法不会获取以编程方式设置的名称，
	//所以使用环形交叉口getElementsByName测试
	support.getById = assert（function（div）{
		docElem.appendChild（div）.id = expando;
		return！document.getElementsByName || ！document.getElementsByName（expando）.length;
	}）;

	// ID查找并过滤
	if（support.getById）{
		Expr.find [“ID”] = function（id，context）{
			if（typeof context.getElementById！==“undefined”&& documentIsHTML）{
				var m = context.getElementById（id）;
				回来？[m]：[];
			}
		};
		Expr.filter [“ID”] =函数（id）{
			var attrId = id.replace（runescape，funescape）;
			return函数（elem）{
				return elem.getAttribute（“id”）=== attrId;
			};
		};
	} else {
		//支持：IE6 / 7
		// getElementById作为查找快捷方式不可靠
		删除Expr.find [“ID”];

		Expr.filter [“ID”] =函数（id）{
			var attrId = id.replace（runescape，funescape）;
			return函数（elem）{
				var node = typeof elem.getAttributeNode！==“undefined”&&
					elem.getAttributeNode（ “ID”）;
				return node && node.value === attrId;
			};
		};
	}

	// 标签
	Expr.find [“TAG”] = support.getElementsByTagName？
		function（tag，context）{
			if（typeof context.getElementsByTagName！==“undefined”）{
				return context.getElementsByTagName（tag）;

			// DocumentFragment节点没有gEBTN
			} else if（support.qsa）{
				return context.querySelectorAll（tag）;
			}
		}：

		function（tag，context）{
			var elem，
				tmp = []，
				i = 0，
				//幸运的是巧合，一个（破碎的）gEBTN也出现在DocumentFragment节点上
				results = context.getElementsByTagName（tag）;

			//过滤掉可能的评论
			if（tag ===“*”）{
				while（（elem = results [i ++]））{
					if（elem.nodeType === 1）{
						tmp.push（elem）;
					}
				}

				返回tmp;
			}
			返回结果;
		};

	//类
	Expr.find [“CLASS”] = support.getElementsByClassName && function（className，context）{
		if（typeof context.getElementsByClassName！==“undefined”&& documentIsHTML）{
			return context.getElementsByClassName（className）;
		}
	};

	/ * QSA / matchesSelector
	-------------------------------------------------- -------------------- * /

	// QSA和matchesSelector支持

	// matchesSelector（：active）在为true时报告为false（IE9 / Opera 11.5）
	rbuggyMatches = [];

	// qSa（：focus）在为true时报告为false（Chrome 21）
	//我们允许这样做，因为IE8 / 9中的错误会引发错误
	//每当在iframe上访问`document.activeElement`时
	//所以，我们允许：焦点一直通过QSA来避免IE错误
	//见http://bugs.jquery.com/ticket/13378
	rbuggyQSA = [];

	if（（support.qsa = rnative.test（document.querySelectorAll）））{
		//构建QSA正则表达式
		//来自Diego Perini的正则表达式策略
		断言（function（div）{
			// Select有意设置为空字符串
			//这是为了测试IE的未明确处理
			//设置布尔内容属性，
			//因为它的存在应该足够了
			// http://bugs.jquery.com/ticket/12359
			docElem.appendChild（div）.innerHTML =“<a id ='" + expando +”'> </a>“+
				“<select id ='”+ expando +“ -  \ r \\'msallowcapture =''>”+
				“<option selected =''> </ option> </ select>”;

			//支持：IE8，Opera 11-12.16
			//当空字符串跟随^ =或$ =或* =时，不应选择任何内容
			//测试属性在Opera中必须是未知的，但对WinRT来说是“安全的”
			// http://msdn.microsoft.com/en-us/library/ie/hh465388.aspx#attribute_section
			if（div.querySelectorAll（“[msallowcapture ^ ='']”）。length）{
				rbuggyQSA.push（“[* ^ $] =”+ whitespace +“*（？：''| \”\“）”）;
			}

			//支持：IE8
			//布尔属性和“值”未得到正确处理
			if（！div.querySelectorAll（“[selected]”）。length）{
				rbuggyQSA.push（“\\ [”+ whitespace +“*（?: value |”+ booleans +“）”）;
			}

			//支持：Chrome <29，Android <4.4，Safari <7.0 +，iOS <7.0+，PhantomJS <1.9.8+
			if（！div.querySelectorAll（“[id~ =”+ expando +“ - ]”）。length）{
				rbuggyQSA.push（ “〜=”）;
			}

			// Webkit / Opera  - ：checked应返回选定的选项元素
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			// IE8在这里抛出错误，不会看到以后的测试
			if（！div.querySelectorAll（“：checked”）。length）{
				rbuggyQSA.push（ “：检查”）;
			}

			//支持：Safari 8 +，iOS 8+
			// https://bugs.webkit.org/show_bug.cgi?id=136851
			//页内`selector #id sibing-combinator selector`失败
			if（！div.querySelectorAll（“a＃”+ expando +“+ *”）。length）{
				rbuggyQSA.push（ “＃+ [+〜]。”）;
			}
		}）;

		断言（function（div）{
			//支持：Windows 8 Native Apps
			//在.innerHTML赋值期间，类型和名称属性受到限制
			var input = document.createElement（“input”）;
			input.setAttribute（“type”，“hidden”）;
			div.appendChild（input）.setAttribute（“name”，“D”）;

			//支持：IE8
			//强制使用name属性区分大小写
			if（div.querySelectorAll（“[name = d]”）。length）{
				rbuggyQSA.push（“name”+ whitespace +“* [* ^ $ |！〜]？=”）;
			}

			// FF 3.5  - ：启用/：禁用和隐藏元素（隐藏元素仍然启用）
			// IE8在这里抛出错误，不会看到以后的测试
			if（！div.querySelectorAll（“：enabled”）。length）{
				rbuggyQSA.push（“：enabled”，“：disabled”）;
			}

			// Opera 10-11不会抛出逗号后的无效伪
			div.querySelectorAll（ “* ,: X”）;
			rbuggyQSA.push（ “*：”）;
		}）;
	}

	if（（support.matchesSelector = rnative.test（（matches = docElem.matches ||
		docElem.webkitMatchesSelector ||
		docElem.mozMatchesSelector ||
		docElem.oMatchesSelector ||
		docElem.msMatchesSelector））））{

		断言（function（div）{
			//检查是否可以执行matchesSelector
			//在断开连接的节点上（IE 9）
			support.disconnectedMatch = matches.call（div，“div”）;

			//这应该失败并出现异常
			// Gecko没有错误，而是返回false
			matches.call（div，“[s！='']：x”）;
			rbuggyMatches.push（“！=”，pseudos）;
		}）;
	}

	rbuggyQSA = rbuggyQSA.length && new RegExp（rbuggyQSA.join（“|”））;
	rbuggyMatches = rbuggyMatches.length && new RegExp（rbuggyMatches.join（“|”））;

	/ *包含
	-------------------------------------------------- -------------------- * /
	hasCompare = rnative.test（docElem.compareDocumentPosition）;

	//元素包含另一个
	//有目的地自我排斥
	//在中，元素不包含自身
	contains = hasCompare || rnative.test（docElem.contains）？
		function（a，b）{
			var adown = a.nodeType === 9？a.documentElement：a，
				bup = b && b.parentNode;
			返回=== bup || !!（bup && bup.nodeType === 1 &&（
				adown.contains？
					adown.contains（bup）：
					a.compareDocumentPosition && a.compareDocumentPosition（bup）＆16
			））;
		}：
		function（a，b）{
			if（b）{
				while（（b = b.parentNode））{
					if（b === a）{
						返回true;
					}
				}
			}
			返回false;
		};

	/ *排序
	-------------------------------------------------- -------------------- * /

	//文档订单排序
	sortOrder = hasCompare？
	function（a，b）{

		//重复删除标记
		if（a === b）{
			hasDuplicate = true;
			返回0;
		}

		//如果只有一个输入具有compareDocumentPosition，则排序方法存在
		var compare =！a.compareDocumentPosition  - ！b.compareDocumentPosition;
		if（compare）{
			回报比较;
		}

		//如果两个输入都属于同一文档，则计算位置
		compare =（a.ownerDocument || a）===（b.ownerDocument || b）？
			a.compareDocumentPosition（b）：

			//否则我们知道他们已断开连接
			1;

		//已断开连接的节点
		if（比较＆1 ||
			（！support.sortDetached && b.compareDocumentPosition（a）=== compare））{

			//选择与我们首选文档相关的第一个元素
			if（a === document || a.ownerDocument === preferredDoc && contains（preferredDoc，a））{
				返回-1;
			}
			if（b === document || b.ownerDocument === preferredDoc && contains（preferredDoc，b））{
				返回1;
			}

			//保持原始订单
			返回sortInput？
				（indexOf（sortInput，a） -  indexOf（sortInput，b））：
				0;
		}

		返回比较＆4？-1：1;
	}：
	function（a，b）{
		//如果节点相同，则提前退出
		if（a === b）{
			hasDuplicate = true;
			返回0;
		}

		var cur，
			i = 0，
			aup = a.parentNode，
			bup = b.parentNode，
			ap = [a]，
			bp = [b];

		//无父节点是文档或断开连接
		if（！aup ||！bup）{
			返回一个===文件？-1：
				b ===文件？1：
				哎？-1：
				bup？1：
				sortInput？
				（indexOf（sortInput，a） -  indexOf（sortInput，b））：
				0;

		//如果节点是兄弟节点，我们可以快速检查
		} else if（aup === bup）{
			return siblingCheck（a，b）;
		}

		//否则我们需要他们的祖先的完整列表进行比较
		cur = a;
		while（（cur = cur.parentNode））{
			ap.unshift（cur）;
		}
		cur = b;
		while（（cur = cur.parentNode））{
			bp.unshift（cur）;
		}

		//走下树寻找差异
		while（ap [i] === bp [i]）{
			我++;
		}

		回来我？
			//做兄弟检查节点是否有共同的祖先
			siblingCheck（ap [i]，bp [i]）：

			//否则我们文档中的节点首先排序
			ap [i] === preferredDoc？-1：
			bp [i] === preferredDoc？1：
			0;
	};

	退货文件;
};

Sizzle.matches = function（expr，elements）{
	return Sizzle（expr，null，null，elements）;
};

Sizzle.matchesSelector = function（elem，expr）{
	//如果需要，设置文档变量
	if（（elem.ownerDocument || elem）！== document）{
		setDocument（elem）;
	}

	//确保引用属性选择器
	expr = expr.replace（rattributeQuotes，“='$ 1']”）;

	if（support.matchesSelector && documentIsHTML &&
		！compilerCache [expr +“”] &&
		（！rbuggyMatches ||！rbuggyMatches.test（expr））&&
		（！rbuggyQSA ||！rbuggyQSA.test（expr）））{

		尝试{
			var ret = matches.call（elem，expr）;

			// IE 9的matchesSelector在断开连接的节点上返回false
			if（ret || support.disconnectedMatch ||
					//同样，断开连接的节点也被称为文档
					// IE 9中的片段
					elem.document && elem.document.nodeType！== 11）{
				返回;
			}
		} catch（e）{}
	}

	return Sizzle（expr，document，null，[elem]）。length> 0;
};

Sizzle.contains = function（context，elem）{
	//如果需要，设置文档变量
	if（（context.ownerDocument || context）！== document）{
		setDocument（context）;
	}
	return contains（context，elem）;
};

Sizzle.attr = function（elem，name）{
	//如果需要，设置文档变量
	if（（elem.ownerDocument || elem）！== document）{
		setDocument（elem）;
	}

	var fn = Expr.attrHandle [name.toLowerCase（）]，
		//不要被Object.prototype属性愚弄（jQuery＃13807）
		val = fn && hasOwn.call（Expr.attrHandle，name.toLowerCase（））？
			fn（elem，name，！documentIsHTML）：
			不确定的;

	return val！== undefined？
		val：
		support.attributes || ！documentIsHTML？
			elem.getAttribute（name）：
			（val = elem.getAttributeNode（name））&& val.specified？
				val.value：
				空值;
};

Sizzle.error = function（msg）{
	抛出新错误（“语法错误，无法识别的表达式：”+ msg）;
};

/ **
 *文件分类和删除重复
 * @param {ArrayLike}结果
 * /
Sizzle.uniqueSort = function（results）{
	var elem，
		duplicates = []，
		j = 0，
		i = 0;

	//除非我们*知道*我们可以检测到重复，否则请假设它们存在
	hasDuplicate =！support.detectDuplicates;
	sortInput =！support.sortStable && results.slice（0）;
	results.sort（sortOrder）;

	if（hasDuplicate）{
		while（（elem = results [i ++]））{
			if（elem === results [i]）{
				j = duplicates.push（i）;
			}
		}
		while（j--）{
			results.splice（duplicates [j]，1）;
		}
	}

	//排序后清除输入以释放对象
	//请参阅https://github.com/jquery/sizzle/pull/225
	sortInput = null;

	返回结果;
};

/ **
 *实用程序函数，用于检索DOM节点数组的文本值
 * @param {Array | Element} elem
 * /
getText = Sizzle.getText = function（elem）{
	var节点，
		ret =“”，
		i = 0，
		nodeType = elem.nodeType;

	if（！nodeType）{
		//如果没有nodeType，那么这应该是一个数组
		while（（node = elem [i ++]））{
			//不要遍历评论节点
			ret + = getText（node）;
		}
	} else if（nodeType === 1 || nodeType === 9 || nodeType === 11）{
		//对元素使用textContent
		//删除了innerText用法以保证新行的一致性（jQuery＃11153）
		if（typeof elem.textContent ===“string”）{
			return elem.textContent;
		} else {
			//穿越它的孩子
			for（elem = elem.firstChild; elem; elem = elem.nextSibling）{
				ret + = getText（elem）;
			}
		}
	} else if（nodeType === 3 || nodeType === 4）{
		return elem.nodeValue;
	}
	//不包括注释或处理指令节点

	返回;
};

Expr = Sizzle.selectors = {

	//可以由用户调整
	cacheLength：50，

	createPseudo：markFunction，

	匹配：matchExpr，

	attrHandle：{}，

	找： {}，

	亲戚：{
		“>”：{dir：“parentNode”，first：true}，
		“”：{dir：“parentNode”}，
		“+”：{dir：“previousSibling”，first：true}，
		“〜”：{dir：“previousSibling”}
	}，

	preFilter：{
		“ATTR”：function（match）{
			match [1] = match [1] .replace（runescape，funescape）;

			//移动给定值以匹配[3]是引用还是不引用
			match [3] =（match [3] || match [4] || match [5] ||“”）.replace（runescape，funescape）;

			if（match [2] ===“〜=”）{
				match [3] =“”+ match [3] +“”;
			}

			return match.slice（0,4）;
		}，

		“CHILD”：function（match）{
			/ *匹配来自matchExpr [“CHILD”]
				1种类型（仅| nth | ...）
				2什么（孩子的类型）
				3个参数（偶数|奇数| \ d * | \ d * n（[+  - ] \ d +）？| ...）
				xn + y参数的4 xn分量（[+  - ]？\ d * n |）
				5个xn分量的符号
				6 x xn-component
				y分量的7个符号
				y元素8 y
			* /
			match [1] = match [1] .toLowerCase（）;

			if（match [1] .slice（0,3）===“nth”）{
				// nth- *需要参数
				if（！match [3]）{
					Sizzle.error（匹配[0]）;
				}

				// Expr.filter.CHILD的数字x和y参数
				//记住false / true分别为0/1
				match [4] = +（match [4]？match [5] +（match [6] || 1）：2 *（match [3] ===“even”|| match [3] ===“奇怪的“））;
				match [5] = +（（match [7] + match [8]）|| match [3] ===“odd”）;

			//其他类型禁止参数
			} else if（match [3]）{
				Sizzle.error（匹配[0]）;
			}

			回归比赛;
		}，

		“PSEUDO”：function（match）{
			var过剩，
				unquoted =！match [6] && match [2];

			if（matchExpr [“CHILD”]。test（match [0]））{
				return null;
			}

			//按原样接受引用的参数
			if（匹配[3]）{
				匹配[2] =匹配[4] || 匹配[5] || “”;

			//从不带引号的参数中删除多余的字符
			} else if（unquoted && rpseudo.test（unquoted）&&
				//从tokenize中获取多余（递归）
				（excess = tokenize（unquoted，true））&&
				//前进到下一个右括号
				（excess = unquoted.indexOf（“）”，unquoted.length  -  excess） -  unquoted.length））{

				//多余是负指数
				match [0] = match [0] .slice（0，excess）;
				match [2] = unquoted.slice（0，excess）;
			}

			//仅返回伪过滤器方法所需的捕获（类型和参数）
			return match.slice（0,3）;
		}
	}，

	过滤器：{

		“TAG”：function（nodeNameSelector）{
			var nodeName = nodeNameSelector.replace（runescape，funescape）.toLowerCase（）;
			return nodeNameSelector ===“*”？
				function（）{return true; }：
				function（elem）{
					return elem.nodeName && elem.nodeName.toLowerCase（）=== nodeName;
				};
		}，

		“CLASS”：function（className）{
			var pattern = classCache [className +“”];

			返回模式||
				（pattern = new RegExp（“（^ |”+ whitespace +“）”+ className +“（”+ whitespace +“| $）”））&&
				classCache（className，function（elem）{
					return pattern.test（typeof elem.className ===“string”&& elem.className || typeof elem.getAttribute！==“undefined”&& elem.getAttribute（“class”）||“”）;
				}）;
		}，

		“ATTR”：函数（名称，运算符，检查）{
			return函数（elem）{
				var result = Sizzle.attr（elem，name）;

				if（result == null）{
					return operator ===“！=”;
				}
				if（！operator）{
					返回true;
				}

				结果+ =“”;

				return operator ===“=”？结果===检查：
					operator ===“！=”？结果！==检查：
					operator ===“^ =”？check && result.indexOf（check）=== 0：
					operator ===“* =”？check && result.indexOf（check）> -1：
					operator ===“$ =”？check && result.slice（-check.length）=== check：
					operator ===“〜=”？（“”+ result.replace（rwhitespace，“”）+“”）。indexOf（check）> -1：
					operator ===“| =”？结果===检查|| result.slice（0，check.length + 1）=== check +“ - ”：
					假;
			};
		}，

		“CHILD”：函数（类型，内容，参数，第一个，最后一个）{
			var simple = type.slice（0,3）！==“nth”，
				forward = type.slice（-4）！==“last”，
				ofType = what ===“of-type”;

			先退回=== 1 && last === 0？

				//快捷方式：第n  -  *（n）
				function（elem）{
					return !! elem.parentNode;
				}：

				function（elem，context，xml）{
					var cache，uniqueCache，outerCache，node，nodeIndex，start，
						dir =简单！==转发？“nextSibling”：“previousSibling”，
						parent = elem.parentNode，
						name = ofType && elem.nodeName.toLowerCase（），
						useCache =！xml &&！ofType，
						diff = false;

					if（parent）{

						// :( first | last | only） - （child | of-type）
						if（simple）{
							while（dir）{
								node = elem;
								while（（node = node [dir]））{
									if（ofType？
										node.nodeName.toLowerCase（）=== name：
										node.nodeType === 1）{

										返回false;
									}
								}
								//反向：仅 -  *（如果我们还没有这样做）
								start = dir = type ===“only”&&！start &&“nextSibling”;
							}
							返回true;
						}

						开始= [前进？parent.firstChild：parent.lastChild];

						// non-xml：nth-​​child（...）将缓存数据存储在`parent`上
						if（forward && useCache）{

							//从先前缓存的索引中搜索`elem`

							// ...以gzip友好的方式
							node = parent;
							outerCache = node [expando] || （node [expando] = {}）;

							//支持：IE <9
							//抵御克隆的attroperties（jQuery gh-1709）
							uniqueCache = outerCache [node.uniqueID] ||
								（outerCache [node.uniqueID] = {}）;

							cache = uniqueCache [type] || [];
							nodeIndex = cache [0] === dirruns && cache [1];
							diff = nodeIndex && cache [2];
							node = nodeIndex && parent.childNodes [nodeIndex];

							while（（node = ++ nodeIndex && node && node [dir] ||

								//从一开始就回到寻求“elem”
								（diff = nodeIndex = 0）|| start.pop（）））{

								//找到后，在`parent`上缓存索引并中断
								if（node.nodeType === 1 && ++ diff && node === elem）{
									uniqueCache [type] = [dirruns，nodeIndex，diff];
									打破;
								}
							}

						} else {
							//使用先前缓存的元素索引（如果可用）
							if（useCache）{
								// ...以gzip友好的方式
								node = elem;
								outerCache = node [expando] || （node [expando] = {}）;

								//支持：IE <9
								//抵御克隆的attroperties（jQuery gh-1709）
								uniqueCache = outerCache [node.uniqueID] ||
									（outerCache [node.uniqueID] = {}）;

								cache = uniqueCache [type] || [];
								nodeIndex = cache [0] === dirruns && cache [1];
								diff = nodeIndex;
							}

							// xml：nth-​​child（...）
							//或：nth-​​last-child（...）或：nth（-last）？ -  of-type（...）
							if（diff === false）{
								//使用与上面相同的循环从头开始寻找“elem”
								while（（node = ++ nodeIndex && node && node [dir] ||
									（diff = nodeIndex = 0）|| start.pop（）））{

									if（（ofType？
										node.nodeName.toLowerCase（）=== name：
										node.nodeType === 1）&&
										++ diff）{

										//缓存每个遇到元素的索引
										if（useCache）{
											outerCache = node [expando] || （node [expando] = {}）;

											//支持：IE <9
											//抵御克隆的attroperties（jQuery gh-1709）
											uniqueCache = outerCache [node.uniqueID] ||
												（outerCache [node.uniqueID] = {}）;

											uniqueCache [type] = [dirruns，diff];
										}

										if（node === elem）{
											打破;
										}
									}
								}
							}
						}

						//合并偏移量，然后检查循环大小
						diff  -  = last;
						return diff === first || （diff％first === 0 && diff / first> = 0）;
					}
				};
		}，

		“PSEUDO”：function（伪，参数）{
			//伪类名称不区分大小写
			// http://www.w3.org/TR/selectors/#pseudo-classes
			//如果使用大写字母添加自定义伪，则按大小写区分优先级
			//记住setFilters继承自pseudos
			var args，
				fn = Expr.pseudos [伪] || Expr.setFilters [pseudo.toLowerCase（）] ||
					Sizzle.error（“unsupported pseudo：”+ pseudo）;

			//用户可以使用createPseudo来指示
			//创建过滤函数需要参数
			//正如Sizzle所做的那样
			if（fn [expando]）{
				return fn（argument）;
			}

			//但保持对旧签名的支持
			if（fn.length> 1）{
				args = [伪，伪，“”，参数];
				返回Expr.setFilters.hasOwnP roperty （pseudo.toLowerCase（））？
					markFunction（function（seed，matches）{
						var idx，
							匹配= fn（种子，参数），
							i = matched.length;
						当我 -  ） {
							idx = indexOf（seed，matched [i]）;
							seed [idx] =！（匹配[idx] = matched [i]）;
						}
					}）：
					function（elem）{
						return fn（elem，0，args）;
					};
			}

			返回fn;
		}
	}，

	伪：{
		//可能是复杂的伪
		“not”：markFunction（function（selector）{
			//修剪传递给编译器的选择器
			//避免处理前导和尾随
			//作为组合器的空格
			var input = []，
				results = []，
				matcher = compile（selector.replace（rtrim，“$ 1”））;

			返回匹配器[expando]？
				markFunction（function（seed，matches，context，xml）{
					var elem，
						unmatched = matcher（seed，null，xml，[]），
						i = seed.length;

					//匹配`matcher`无法匹配的元素
					当我 -  ） {
						if（（elem = unmatched [i]））{
							seed [i] =！（匹配[i] = elem）;
						}
					}
				}）：
				function（elem，context，xml）{
					input [0] = elem;
					matcher（输入，null，xml，结果）;
					//不要保留元素（问题＃299）
					input [0] = null;
					return！results.pop（）;
				};
		}），

		“has”：markFunction（function（selector）{
			return函数（elem）{
				return Sizzle（selector，elem）.length> 0;
			};
		}），

		“contains”：markFunction（function（text）{
			text = text.replace（runescape，funescape）;
			return函数（elem）{
				return（elem.textContent || elem.innerText || getText（elem））。indexOf（text）> -1;
			};
		}），

		//“元素是否由：lang（）选择器表示
		//仅基于元素的语言值
		//等于标识符C，
		//或者以标识符C开头，后面紧跟“ - ”。
		//不区分大小写地执行C与元素语言值的匹配。
		//标识符C不必是有效的语言名称。“
		// http://www.w3.org/TR/selectors/#lang-pseudo
		“lang”：markFunction（function（lang）{
			// lang值必须是有效的标识符
			if（！ridentifier.test（lang ||“”））{
				Sizzle.error（“不支持lang：”+ lang）;
			}
			lang = lang.replace（runescape，funescape）.toLowerCase（）;
			return函数（elem）{
				var elemLang;
				做{
					if（（elemLang = documentIsHTML？
						elem.lang：
						elem.getAttribute（“xml：lang”）|| elem.getAttribute（“lang”）））{

						elemLang = elemLang.toLowerCase（）;
						返回elemLang === lang || elemLang.indexOf（lang +“ - ”）=== 0;
					}
				}（（elem = elem.parentNode）&& elem.nodeType === 1）;
				返回false;
			};
		}），

		//杂项
		“target”：function（elem）{
			var hash = window.location && window.location.hash;
			return hash && hash.slice（1）=== elem.id;
		}，

		“root”：function（elem）{
			return elem === docElem;
		}，

		“focus”：function（elem）{
			return elem === document.activeElement &&（！document.hasFocus || document.hasFocus（））&& !!（elem.type || elem.href || ~elem.tabIndex）;
		}，

		//布尔属性
		“enabled”：function（elem）{
			return elem.disabled === false;
		}，

		“disabled”：function（elem）{
			return elem.disabled === true;
		}，

		“checked”：function（elem）{
			//在CSS3中，：checked应返回已选中和已选中的元素
			// http://www.w3.org/TR/2011/REC-css3-selectors-20110929/#checked
			var nodeName = elem.nodeName.toLowerCase（）;
			return（nodeName ===“input”&& !! elem.checked）|| （nodeName ===“option”&& !! elem.selected）;
		}，

		“selected”：function（elem）{
			//访问此属性会默认选中
			// Safari中的选项正常工作
			if（elem.parentNode）{
				elem.parentNode.selectedIndex;
			}

			return elem.selected === true;
		}，

		//内容
		“empty”：function（elem）{
			// http://www.w3.org/TR/selectors/#empty-pseudo
			//：empty由element（1）或内容节点（text：3; cdata：4; entity ref：5）取消，
			//但不是其他人（评论：8;处理指令：7;等）
			// nodeType <6有效，因为attributes（2）不显示为子项
			for（elem = elem.firstChild; elem; elem = elem.nextSibling）{
				if（elem.nodeType <6）{
					返回false;
				}
			}
			返回true;
		}，

		“parent”：function（elem）{
			返回！Expr.pseudos [“empty”]（elem）;
		}，

		//元素/输入类型
		“header”：function（elem）{
			return rheader.test（elem.nodeName）;
		}，

		“input”：function（elem）{
			return rinputs.test（elem.nodeName）;
		}，

		“button”：function（elem）{
			var name = elem.nodeName.toLowerCase（）;
			返回名称===“输入”&& elem.type ===“按钮”|| name ===“button”;
		}，

		“text”：function（elem）{
			var attr;
			return elem.nodeName.toLowerCase（）===“input”&&
				elem.type ===“text”&&

				//支持：IE <8
				//新的HTML5属性值（例如“搜索”）与elem.type ===“text”一起出现
				（（attr = elem.getAttribute（“type”））== null || attr.toLowerCase（）===“text”）;
		}，

		//收集位置
		“first”：createPositionalPseudo（function（）{
			return [0];
		}），

		“last”：createPositionalPseudo（function（matchIndexes，length）{
			return [length  -  1];
		}），

		“eq”：createPositionalPseudo（function（matchIndexes，length，argument）{
			return [参数<0？argument + length：argument];
		}），

		“even”：createPositionalPseudo（function（matchIndexes，length）{
			var i = 0;
			for（; i <length; i + = 2）{
				matchIndexes.push（i）;
			}
			return matchIndexes;
		}），

		“odd”：createPositionalPseudo（function（matchIndexes，length）{
			var i = 1;
			for（; i <length; i + = 2）{
				matchIndexes.push（i）;
			}
			return matchIndexes;
		}），

		“lt”：createPositionalPseudo（function（matchIndexes，length，argument）{
			var i =参数<0？参数+长度：参数;
			for（; --i> = 0;）{
				matchIndexes.push（i）;
			}
			return matchIndexes;
		}），

		“gt”：createPositionalPseudo（function（matchIndexes，length，argument）{
			var i =参数<0？参数+长度：参数;
			for（; ++ i <length;）{
				matchIndexes.push（i）;
			}
			return matchIndexes;
		}）
	}
};

Expr.pseudos [“nth”] = Expr.pseudos [“eq”];

//添加按钮/输入类型伪
for（i in {radio：true，checkbox：true，file：true，password：true，image：true}）{
	Expr.pseudos [i] = createInputPseudo（i）;
}
for（i in {submit：true，reset：true}）{
	Expr.pseudos [i] = createButtonPseudo（i）;
}

//用于创建新setFilters的Easy API
function setFilters（）{}
setFilters.prototype = Expr.filters = Expr.pseudos;
Expr.setFilters = new setFilters（）;

tokenize = Sizzle.tokenize = function（selector，parseOnly）{
	var匹配，匹配，令牌，类型，
		soFar，groups，preFilters，
		cached = tokenCache [selector +“”];

	if（缓存）{
		返回parseOnly？0：cached.slice（0）;
	}

	soFar =选择器;
	groups = [];
	preFilters = Expr.preFilter;

	while（soFar）{

		//逗号和第一次运行
		if（！matched ||（match = rcomma.exec（soFar）））{
			if（match）{
				//不要将尾随逗号视为有效
				soFar = soFar.slice（match [0] .length）|| 至今;
			}
			groups.push（（tokens = []））;
		}

		匹配=假;

		//组合
		if（（match = rcombinators.exec（soFar）））{
			matched = match.shift（）;
			tokens.push（{
				价值：匹配，
				//将后代组合子投射到空间
				type：match [0] .replace（rtrim，“”）
			}）;
			soFar = soFar.slice（matched.length）;
		}

		//过滤器
		for（在Expr.filter中输入）{
			if（（match = matchExpr [type] .exec（soFar））&&（！preFilters [type] ||
				（match = preFilters [type]（match））））{
				matched = match.shift（）;
				tokens.push（{
					价值：匹配，
					类型：类型，
					匹配：匹配
				}）;
				soFar = soFar.slice（matched.length）;
			}
		}

		if（！matched）{
			打破;
		}
	}

	//返回无效多余的长度
	//如果我们只是解析
	//否则，抛出错误或返回令牌
	返回parseOnly？
		soFar.length：
		至今 ？
			Sizzle.error（选择器）：
			//缓存令牌
			tokenCache（selector，groups）.slice（0）;
};

function toSelector（tokens）{
	var i = 0，
		len = tokens.length，
		selector =“”;
	for（; i <len; i ++）{
		selector + = tokens [i] .value;
	}
	返回选择器;
}

function addCombinator（matcher，combinator，base）{
	var dir = combinator.dir，
		checkNonElements = base && dir ===“parentNode”，
		doneName = done ++;

	返回combinator.first？
		//检查最近的祖先/前一个元素
		function（elem，context，xml）{
			while（（elem = elem [dir]））{
				if（elem.nodeType === 1 || checkNonElements）{
					return matcher（elem，context，xml）;
				}
			}
		}：

		//检查所有祖先/前面的元素
		function（elem，context，xml）{
			var oldCache，uniqueCache，outerCache，
				newCache = [dirruns，doneName];

			//我们无法在XML节点上设置任意数据，因此它们无法从组合缓存中受益
			if（xml）{
				while（（elem = elem [dir]））{
					if（elem.nodeType === 1 || checkNonElements）{
						if（matcher（elem，context，xml））{
							返回true;
						}
					}
				}
			} else {
				while（（elem = elem [dir]））{
					if（elem.nodeType === 1 || checkNonElements）{
						outerCache = elem [expando] || （elem [expando] = {}）;

						//支持：IE <9
						//抵御克隆的attroperties（jQuery gh-1709）
						uniqueCache = outerCache [elem.uniqueID] || （outerCache [elem.uniqueID] = {}）;

						if（（oldCache = uniqueCache [dir]）&&
							oldCache [0] === dirruns && oldCache [1] === doneName）{

							//分配给newCache，以便结果反向传播到以前的元素
							return（newCache [2] = oldCache [2]）;
						} else {
							//重用newcache，使结果反向传播到前面的元素
							uniqueCache [dir] = newCache;

							//一场比赛意味着我们已经完成了; 失败意味着我们必须继续检查
							if（（newCache [2] = matcher（elem，context，xml）））{
								返回true;
							}
						}
					}
				}
			}
		};
}

function elementMatcher（matchers）{
	return matchers.length> 1？
		function（elem，context，xml）{
			var i = matchers.length;
			当我 -  ） {
				if（！matchers [i]（elem，context，xml））{
					返回false;
				}
			}
			返回true;
		}：
		匹配器[0];
}

function multipleContexts（selector，contexts，results）{
	var i = 0，
		len = contexts.length;
	for（; i <len; i ++）{
		Sizzle（选择器，contexts [i]，结果）;
	}
	返回结果;
}

function condense（unmatched，map，filter，context，xml）{
	var elem，
		newUnmatched = []，
		i = 0，
		len = unmatched.length，
		mapped = map！= null;

	for（; i <len; i ++）{
		if（（elem = unmatched [i]））{
			if（！filter || filter（elem，context，xml））{
				newUnmatched.push（elem）;
				if（mapped）{
					map.push（i）;
				}
			}
		}
	}

	return newUnmatched;
}

function setMatcher（preFilter，selector，matcher，postFilter，postFinder，postSelector）{
	if（postFilter &&！postFilter [expando]）{
		postFilter = setMatcher（postFilter）;
	}
	if（postFinder &&！postFinder [expando]）{
		postFinder = setMatcher（postFinder，postSelector）;
	}
	return markFunction（function（seed，results，context，xml）{
		var temp，i，elem，
			preMap = []，
			postMap = []，
			preexisting = results.length，

			//从种子或上下文中获取初始元素
			elems =种子|| multipleContexts（selector ||“*”，context.nodeType？[context]：context，[]），

			// Prefilter获取匹配器输入，保留种子结果同步的映射
			matcherIn = preFilter &&（seed ||！selector）？
				压缩（elems，preMap，preFilter，context，xml）：
				elems的，

			matcherOut = matcher？
				//如果我们有postFinder，或过滤的种子，或非种子postFilter或预先存在的结果，
				postFinder || （种子？preFilter：preexisting || postFilter）？

					// ...中间处理是必要的
					[]：

					// ...否则直接使用结果
					结果：
				matcherIn;

		//查找主要匹配项
		if（matcher）{
			matcher（matcherIn，matcherOut，context，xml）;
		}

		//应用postFilter
		if（postFilter）{
			temp = condense（matcherOut，postMap）;
			postFilter（temp，[]，context，xml）;

			//通过将失败的元素移回matcherIn来使其失败
			i = temp.length;
			当我 -  ） {
				if（（elem = temp [i]））{
					matcherOut [postMap [i]] =！（matcherIn [postMap [i]] = elem）;
				}
			}
		}

		if（seed）{
			if（postFinder || preFilter）{
				if（postFinder）{
					//通过将此中间项压缩到postFinder上下文中来获取最终的matcherOut
					temp = [];
					i = matcherOut.length;
					当我 -  ） {
						if（（elem = matcherOut [i]））{
							//恢复matcherIn因为elem还不是最终匹配
							temp.push（（matcherIn [i] = elem））;
						}
					}
					postFinder（null，（matcherOut = []），temp，xml）;
				}

				//将匹配的元素从种子移动到结果以使它们保持同步
				i = matcherOut.length;
				当我 -  ） {
					if（（elem = matcherOut [i]）&&
						（temp = postFinder？indexOf（seed，elem）：preMap [i]）> -1）{

						seed [temp] =！（results [temp] = elem）;
					}
				}
			}

		//如果已定义，则通过postFinder向结果中添加元素
		} else {
			matcherOut =浓缩（
				matcherOut ===结果？
					matcherOut.splice（preexisting，matcherOut.length）：
					matcherOut
			）;
			if（postFinder）{
				postFinder（null，results，matcherOut，xml）;
			} else {
				push.apply（results，matcherOut）;
			}
		}
	}）;
}

function matcherFromTokens（tokens）{
	var checkContext，matcher，j，
		len = tokens.length，
		leadingRelative = Expr.relative [tokens [0] .type]，
		implicitRelative = leadingRelative || Expr.relative [“”]，
		我=领先相对？1：0，

		//基础匹配器确保元素可从顶层上下文访问
		matchContext = addCombinator（function（elem）{
			return elem === checkContext;
		}，implicitRelative，true），
		matchAnyContext = addCombinator（function（elem）{
			return indexOf（checkContext，elem）> -1;
		}，implicitRelative，true），
		matchers = [function（elem，context，xml）{
			var ret =（！leadingRelative &&（xml || context！== outermostContext））|| （
				（checkContext = context）.nodeType？
					matchContext（elem，context，xml）：
					matchAnyContext（elem，context，xml））;
			//避免挂在元素上（问题＃299）
			checkContext = null;
			返回;
		}];

	for（; i <len; i ++）{
		if（（matcher = Expr.relative [tokens [i] .type]））{
			matchers = [addCombinator（elementMatcher（matchers），matcher）];
		} else {
			matcher = Expr.filter [tokens [i] .type] .apply（null，tokens [i] .matches）;

			//在看到位置匹配器后返回特殊情况
			if（matcher [expando]）{
				//找到下一个相对运算符（如果有）以便正确处理
				j = ++ i;
				for（; j <len; j ++）{
					if（Expr.relative [tokens [j] .type]）{
						打破;
					}
				}
				return setMatcher（
					i> 1 && elementMatcher（matchers），
					i> 1 && toSelector（
						//如果前面的标记是后代组合子，则插入一个隐式的任意元素`*`
						tokens.slice（0，i  -  1）.concat（{value：tokens [i  -  2] .type ===“”？“*”：“”}）
					）.replace（rtrim，“$ 1”），
					匹配，
					我<j && matcherFromTokens（tokens.slice（i，j）），
					j <len && matcherFromTokens（（tokens = tokens.slice（j））），
					j <len && toSelector（令牌）
				）;
			}
			matchers.push（matcher）;
		}
	}

	return elementMatcher（matchers）;
}

function matcherFromGroupMatchers（elementMatchers，setMatchers）{
	var bySet = setMatchers.length> 0，
		byElement = elementMatchers.length> 0，
		superMatcher = function（seed，context，xml，results，outermost）{
			var elem，j，matcher，
				matchedCount = 0，
				i =“0”，
				unmatched = seed && []，
				setMatched = []，
				contextBackup = outermostContext，
				//我们必须始终拥有种子元素或最外层的上下文
				elems =种子|| byElement && Expr.find [“TAG”]（“*”，最外层），
				//使用整数dirruns iff这是最外层的匹配器
				dirrunsUnique =（dirruns + = contextBackup == null？1：Math.random（）|| 0.1），
				len = elems.length;

			if（outermost）{
				outermostContext = context === document || 上下文|| 最外层;
			}

			//添加将elementMatchers直接传递给结果的元素
			//支持：IE <9，Safari
			//通过id容忍NodeList属性（IE：“length”; Safari：<number>）匹配元素
			for（; i！== len &&（elem = elems [i]）！= null; i ++）{
				if（byElement && elem）{
					j = 0;
					if（！context && elem.ownerDocument！== document）{
						setDocument（elem）;
						xml =！documentIsHTML;
					}
					while（（matcher = elementMatchers [j ++]））{
						if（matcher（elem，context || document，xml））{
							results.push（elem）;
							打破;
						}
					}
					if（outermost）{
						dirruns = dirrunsUnique;
					}
				}

				//跟踪设置过滤器的不匹配元素
				if（bySet）{
					//他们将经历所有可能的匹配
					if（（elem =！matcher && elem））{
						matchedCount--;
					}

					//为每个元素延长数组，匹配与否
					if（seed）{
						unmatched.push（elem）;
					}
				}
			}

			//`i`现在是上面访问过的元素的数量，并将它添加到`matchedCount`
			//使后者为非负数。
			matchedCount + = i;

			//将集合过滤器应用于不匹配的元素
			//注意：如果没有不匹配的元素（即`matchedCount`），可以跳过这个
			//等于`i`），除非我们没有访问上面循环中的_any_元素，因为我们有
			//没有元素匹配，没有种子。
			//增加一个初始字符串“0”`i`允许`i`只保留一个字符串
			// case，这将导致“00”`matchedCount`与`i`不同，但也是
			//数字为零
			if（bySet && i！== matchedCount）{
				j = 0;
				while（（matcher = setMatchers [j ++]））{
					matcher（不匹配，setMatched，context，xml）;
				}

				if（seed）{
					//重新整合元素匹配以消除排序的需要
					if（matchedCount> 0）{
						当我 -  ） {
							if（！（unmatched [i] || setMatched [i]））{
								setMatched [i] = pop.call（results）;
							}
						}
					}

					//丢弃索引占位符值以仅获取实际匹配
					setMatched = condense（setMatched）;
				}

				//为结果添加匹配项
				push.apply（results，setMatched）;

				//无核集匹配成功匹配多个成功的匹配器规定排序
				if（outermost &&！seed && setMatched.length> 0 &&
					（matchedCount + setMatchers.length）> 1）{

					Sizzle.uniqueSort（结果）;
				}
			}

			//通过嵌套匹配器覆盖全局变量的操作
			if（outermost）{
				dirruns = dirrunsUnique;
				outermostContext = contextBackup;
			}

			回归无与伦比;
		};

	返回bySet？
		markFunction（superMatcher）：
		superMatcher;
}

compile = Sizzle.compile = function（选择器，匹配/ *仅供内部使用* /）{
	var i，
		setMatchers = []，
		elementMatchers = []，
		cached = compilerCache [selector +“”];

	if（！cached）{
		//生成递归函数的函数，可用于检查每个元素
		if（！match）{
			match = tokenize（selector）;
		}
		i = match.length;
		当我 -  ） {
			cached = matcherFromTokens（match [i]）;
			if（cached [expando]）{
				setMatchers.push（cached）;
			} else {
				elementMatchers.push（cached）;
			}
		}

		//缓存已编译的函数
		cached = compilerCache（selector，matcherFromGroupMatchers（elementMatchers，setMatchers））;

		//保存选择器和标记化
		cached.selector = selector;
	}
	返回缓存;
};

/ **
 *低级选择功能，适用于Sizzle的编译
 *选择器功能
 * @param {String | Function}选择器选择器或预编译器
 *使用Sizzle.compile构建的选择器功能
 * @param {Element}上下文
 * @param {数组} [结果]
 * @param {Array} [seed]要匹配的一组元素
 * /
select = Sizzle.select = function（选择器，上下文，结果，种子）{
	var i，tokens，token，type，find，
		compiled = typeof selector ===“function”&& selector，
		match =！seed && tokenize（（selector = compiled.selector || selector））;

	结果=结果|| [];

	//如果列表中只有一个选择器且没有种子，请尝试最小化操作
	//（后者保证我们的背景）
	if（match.length === 1）{

		//如果前导复合选择器是ID，则减少上下文
		tokens = match [0] = match [0] .slice（0）;
		if（tokens.length> 2 &&（token = tokens [0]）。type ===“ID”&&
				support.getById && context.nodeType === 9 && documentIsHTML &&
				Expr.relative [tokens [1] .type]）{

			context =（Expr.find [“ID”]（token.matches [0] .replace（runescape，funescape），context）|| []）[0];
			if（！context）{
				返回结果;

			//预编译的匹配器仍将验证祖先，因此升级一个级别
			} else if（compiled）{
				context = context.parentNode;
			}

			selector = selector.slice（tokens.shift（）。value.length）;
		}

		//获取从右到左匹配的种子集
		i = matchExpr [“needsContext”]。test（selector）？0：tokens.length;
		当我 -  ） {
			token = tokens [i];

			//如果我们击中组合器就中止
			if（Expr.relative [（type = token.type）]）{
				打破;
			}
			if（（find = Expr.find [type]））{
				//搜索，扩展主要兄弟组合子的上下文
				if（（seed = find（
					token.matches [0] .replace（runescape，funescape），
					rsibling.test（tokens [0] .type）&& testContext（context.parentNode）|| 上下文
				）））{

					//如果种子是空的或没有令牌，我们可以提前返回
					tokens.splice（i，1）;
					selector = seed.length && toSelector（tokens）;
					if（！selector）{
						push.apply（结果，种子）;
						返回结果;
					}

					打破;
				}
			}
		}
	}

	//如果未提供过滤功能，请编译并执行过滤功能
	//如果我们修改了上面的选择器，请提供`match`以避免重新识别
	（编译|| compile（选择器，匹配））（
		种子，
		背景下，
		！documentIsHTML，
		结果，
		！context || rsibling.test（selector）&& testContext（context.parentNode）|| 上下文
	）;
	返回结果;
};

//一次性作业

//排序稳定性
support.sortStable = expando.split（“”）。sort（sortOrder）.join（“”）=== expando;

//支持：Chrome 14-35 +
//如果没有传递给比较函数，则始终假设重复
support.detectDuplicates = !! hasDuplicate;

//针对默认文档初始化
setDocument（）;

//支持：Webkit <537.32  -  Safari 6.0.3 / Chrome 25（在Chrome 27中修复）
//分离的节点混淆地跟随*彼此*
support.sortDetached = assert（function（div1）{
	//应返回1，但返回4（以下）
	return div1.compareDocumentPosition（document.createElement（“div”））＆1;
}）;

//支持：IE <8
//防止属性/属性“插值”
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if（！assert（function（div）{
	div.innerHTML =“<a href='#'> </a>”;
	return div.firstChild.getAttribute（“href”）===“＃”;
}））{
	addHandle（“type | href | height | width”，function（elem，name，isXML）{
		if（！isXML）{
			return elem.getAttribute（name，name.toLowerCase（）===“type”？1：2）;
		}
	}）;
}

//支持：IE <9
//使用defaultValue代替getAttribute（“value”）
if（！support.attributes ||！assert（function（div）{
	div.innerHTML =“<input />”;
	div.firstChild.setAttribute（“value”，“”）;
	return div.firstChild.getAttribute（“value”）===“”;
}））{
	addHandle（“value”，function（elem，name，isXML）{
		if（！isXML && elem.nodeName.toLowerCase（）===“input”）{
			return elem.defaultValue;
		}
	}）;
}

//支持：IE <9
//当getAttribute所在时，使用getAttributeNode获取布尔值
if（！assert（function（div）{
	return div.getAttribute（“disabled”）== null;
}））{
	addHandle（布尔值，函数（elem，name，isXML）{
		var val;
		if（！isXML）{
			return elem [name] === true？name.toLowerCase（）：
					（val = elem.getAttributeNode（name））&& val.specified？
					val.value：
				空值;
		}
	}）;
}

返回Sizzle;

}）（窗口）;



jQuery.find = Sizzle;
jQuery.expr = Sizzle.selectors;
jQuery.expr [“：”] = jQuery.expr.pseudos;
jQuery.uniqueSort = jQuery.unique = Sizzle.uniqueSort;
jQuery.text = Sizzle.getText;
jQuery.isXMLDoc = Sizzle.isXML;
jQuery.contains = Sizzle.contains;



var dir = function（elem，dir，until）{
	var matched = []，
		truncate = until！== undefined;

	while（（elem = elem [dir]）&& elem.nodeType！== 9）{
		if（elem.nodeType === 1）{
			if（truncate && jQuery（elem）.is（until））{
				打破;
			}
			matched.push（elem）;
		}
	}
	返回匹配;
};


var siblings = function（n，elem）{
	var matched = [];

	for（; n; n = n.nextSibling）{
		if（n.nodeType === 1 && n！== elem）{
			matched.push（n）;
		}
	}

	返回匹配;
};


var rneedsContext = jQuery.expr.match.needsContext;

var rsingleTag =（/ ^ <（[\ w  - ] +）\ s * \ /？>（？：<\ / \ 1> |）$ /）;



var risSimple = /^。[^：#\ [。，] {$ /;

//为过滤器实现相同的功能而不是
function winnow（elements，qualifier，not）{
	if（jQuery.isFunction（qualifier））{
		return jQuery.grep（elements，function（elem，i）{
			/ * jshint -W018 * /
			return !! qualifier.call（elem，i，elem）！== not;
		}）;

	}

	if（qualifier.nodeType）{
		return jQuery.grep（elements，function（elem）{
			return（elem === qualifier）！== not;
		}）;

	}

	if（typeof qualifier ===“string”）{
		if（risSimple.test（qualifier））{
			return jQuery.filter（限定符，元素，不是）;
		}

		qualifier = jQuery.filter（限定符，元素）;
	}

	return jQuery.grep（elements，function（elem）{
		return（jQuery.inArray（elem，qualifier）> -1）！== not;
	}）;
}

jQuery.filter = function（expr，elems，not）{
	var elem = elems [0];

	如果不 ） {
		expr =“：not（”+ expr +“）”;
	}

	return elems.length === 1 && elem.nodeType === 1？
		jQuery.find.matchesSelector（elem，expr）？[elem]：[]：
		jQuery.find.matches（expr，jQuery.grep（elems，function（elem）{
			return elem.nodeType === 1;
		}）;;
};

jQuery.fn.extend（{
	find：function（selector）{
		var i，
			ret = []，
			自我=这个，
			len = self.length;

		if（typeof selector！==“string”）{
			return this.pushStack（jQuery（selector）.filter（function（）{
				for（i = 0; i <len; i ++）{
					if（jQuery.contains（self [i]，this））{
						返回true;
					}
				}
			}）;;
		}

		for（i = 0; i <len; i ++）{
			jQuery.find（selector，self [i]，ret）;
		}

		//需要因为$（选择器，上下文）变为$（context）.find（selector）
		ret = this.pushStack（len> 1？jQuery.unique（ret）：ret）;
		ret.selector = this.selector？this.selector +“”+选择器：选择器;
		返回;
	}，
	filter：function（selector）{
		return this.pushStack（winnow（this，selector || []，false））;
	}，
	not：function（selector）{
		return this.pushStack（winnow（this，selector || []，true））;
	}，
	是：function（selector）{
		返回!! winnow（
			这个，

			//如果这是位置/相对选择器，请检查返回集合中的成员资格
			// so $（“p：first”）。is（“p：last”）对于带有两个“p”的doc不会返回true。
			typeof selector ===“string”&& rneedsContext.test（selector）？
				jQuery（选择器）：
				选择器|| []，
			假
		）。长度;
	}
}）;


//初始化一个jQuery对象


//对根jQuery（文档）的中心引用
var rootjQuery，

	//检查HTML字符串的简单方法
	//优先#id <tag>以避免XSS通过location.hash（＃9521）
	//严格的HTML识别（＃11290：必须以<开头）
	rquickExpr = / ^（？：\ s *（<[\ w \ W] +>）[^>] * |＃（[\ w  - ] *））$ /，

	init = jQuery.fn.init = function（selector，context，root）{
		var match，elem;

		// HANDLE：$（“”），$（null），$（undefined），$（false）
		if（！selector）{
			归还这个;
		}

		// init接受备用的rootjQuery
		//所以迁移可以支持jQuery.sub（gh-2101）
		root = root || rootjQuery;

		//处理HTML字符串
		if（typeof selector ===“string”）{
			if（selector.charAt（0）===“<”&&
				selector.charAt（selector.length  -  1）===“>”&&
				selector.length> = 3）{

				//假设以<>开头和结尾的字符串是HTML并跳过正则表达式检查
				match = [null，selector，null];

			} else {
				match = rquickExpr.exec（selector）;
			}

			//匹配html或确保没有为#id指定上下文
			if（match &&（match [1] ||！context））{

				// HANDLE：$（html） - > $（数组）
				if（match [1]）{
					context =上下文实例jQuery？context [0]：context;

					//对于back-compat，脚本为true
					//如果parseHTML不存在，请故意抛出错误
					jQuery.merge（this，jQuery.parseHTML（
						匹配[1]，
						context && context.nodeType？context.ownerDocument || 上下文：文件，
						真正
					））;

					// HANDLE：$（html，props）
					if（rsingleTag.test（match [1]）&& jQuery.isPlainObject（context））{
						for（在上下文中匹配）{

							//如果可能，将上下文的属性称为方法
							if（jQuery.isFunction（this [match]））{
								这[匹配]（context [match]）;

							// ...以及以其他方式设置为属性
							} else {
								this.attr（match，context [match]）;
							}
						}
					}

					归还这个;

				// HANDLE：$（＃id）
				} else {
					elem = document.getElementById（match [2]）;

					//检查parentNode以便在Blackberry 4.6返回时捕获
					//不再在文档＃6963中的节点
					if（elem && elem.parentNode）{

						//处理IE和Opera返回项目的情况
						//按名称而不是ID
						if（elem.id！== match [2]）{
							return rootjQuery.find（selector）;
						}

						//否则，我们将元素直接注入jQuery对象
						this.length = 1;
						这[0] = elem;
					}

					this.context = document;
					this.selector = selector;
					归还这个;
				}

			// HANDLE：$（expr，$（...））
			} else if（！context || context.jquery）{
				return（context || root）.find（selector）;

			// HANDLE：$（expr，context）
			//（这相当于：$（context）.find（expr）
			} else {
				return this.constructor（context）.find（selector）;
			}

		//手柄：$（DOMElement）
		} else if（selector.nodeType）{
			this.context = this [0] = selector;
			this.length = 1;
			归还这个;

		//手柄：$（功能）
		//文档就绪的快捷方式
		} else if（jQuery.isFunction（selector））{
			return typeof root.ready！==“undefined”？
				root.ready（selector）：

				//如果没有准备就立即执行
				selector（jQuery）;
		}

		if（selector.selector！== undefined）{
			this.selector = selector.selector;
			this.context = selector.context;
		}

		return jQuery.makeArray（selector，this）;
	};

//为init函数提供jQuery原型以供以后实例化
init.prototype = jQuery.fn;

//初始化中心参考
rootjQuery = jQuery（document）;


var rparentsprev = / ^（?: parents | prev（？：Until | All））/，

	//保证在从唯一集开始时生成唯一集的方法
	guaranteeUnique = {
		孩子们：是的，
		内容：true，
		下一个：是的，
		上一篇：真的
	};

jQuery.fn.extend（{
	has：function（target）{
		var i，
			targets = jQuery（target，this），
			len = targets.length;

		return this.filter（function（）{
			for（i = 0; i <len; i ++）{
				if（jQuery.contains（this，targets [i]））{
					返回true;
				}
			}
		}）;
	}，

	最近的：函数（选择器，上下文）{
		var cur，
			i = 0，
			l = this.length，
			匹配= []，
			pos = rneedsContext.test（选择器）|| typeof selectors！==“string”？
				jQuery（selectors，context || this.context）：
				0;

		for（; i <l; i ++）{
			for（cur = this [i]; cur && cur！== context; cur = cur.parentNode）{

				//始终跳过文档片段
				if（cur.nodeType <11 &&（pos？
					pos.index（cur）> -1：

					//不要将非元素传递给Sizzle
					cur.nodeType === 1 &&
						jQuery.find.matchesSelector（cur，selectors）））{

					matched.push（cur）;
					打破;
				}
			}
		}

		return this.pushStack（matched.length> 1？jQuery.uniqueSort（matched）：matched）;
	}，

	//确定元素的位置
	//匹配的元素集
	index：function（elem）{

		//没有参数，在父级中返回索引
		if（！elem）{
			return（this [0] && this [0] .parentNode）？this.first（）。prevAll（）。length：-1;
		}

		//选择器中的索引
		if（typeof elem ===“string”）{
			return jQuery.inArray（this [0]，jQuery（elem））;
		}

		//找到所需元素的位置
		return jQuery.inArray（

			//如果收到jQuery对象，则使用第一个元素
			elem.jquery？elem [0]：elem，this）;
	}，

	add：function（selector，context）{
		return this.pushStack（
			jQuery.uniqueSort（
				jQuery.merge（this.get（），jQuery（selector，context））
			）
		）;
	}，

	addBack：function（selector）{
		return this.add（selector == null？
			this.prevObject：this.prevObject.filter（selector）
		）;
	}
}）;

function sibling（cur，dir）{
	做{
		cur = cur [dir];
	} while（cur && cur.nodeType！== 1）;

	返回
}

jQuery.each（{
	parent：function（elem）{
		var parent = elem.parentNode;
		return parent && parent.nodeType！== 11？parent：null;
	}，
	父母：function（elem）{
		return dir（elem，“parentNode”）;
	}，
	parentsUntil：function（elem，i，until）{
		return dir（elem，“parentNode”，until）;
	}，
	下一个：function（elem）{
		返回兄弟（elem，“nextSibling”）;
	}，
	上一篇：function（elem）{
		返回兄弟（elem，“previousSibling”）;
	}，
	nextAll：function（elem）{
		return dir（elem，“nextSibling”）;
	}，
	prevAll：function（elem）{
		return dir（elem，“previousSibling”）;
	}，
	nextUntil：function（elem，i，until）{
		return dir（elem，“nextSibling”，直到）;
	}，
	prevUntil：function（elem，i，until）{
		return dir（elem，“previousSibling”，直到）;
	}，
	兄弟姐妹：function（elem）{
		return siblings（（elem.parentNode || {}）。firstirstChild，elem）;
	}，
	children：function（elem）{
		返回兄弟姐妹（elem.firstChild）;
	}，
	内容：function（elem）{
		返回jQuery.nodeName（elem，“iframe”）？
			elem.contentDocument || elem.contentWindow.document：
			jQuery.merge（[]，elem.childNodes）;
	}
}，function（name，fn）{
	jQuery.fn [name] = function（until，selector）{
		var ret = jQuery.map（this，fn，until）;

		if（name.slice（-5）！==“Until”）{
			selector = until;
		}

		if（selector && typeof selector ===“string”）{
			ret = jQuery.filter（selector，ret）;
		}

		if（this.length> 1）{

			//删除重复项
			if（！guaranteedUnique [name]）{
				ret = jQuery.uniqueSort（ret）;
			}

			//父母*和前衍生品的逆序
			if（rparentsprev.test（name））{
				ret = ret.reverse（）;
			}
		}

		return this.pushStack（ret）;
	};
}）;
var rnotwhite =（/ \ S + / g）;



//将字符串格式的选项转换为对象格式的选项
function createOptions（options）{
	var object = {};
	jQuery.each（options.match（rnotwhite）|| []，function（_，flag）{
		object [flag] = true;
	}）;
	返回对象;
}

/ *
 *使用以下参数创建回调列表：
 *
 *选项：一个可选的空格分隔选项列表，它将改变方式
 *回调列表表现或更传统的选项对象
 *
 *默认情况下，回调列表将像事件回调列表一样，可以
 *多次“解雇”。
 *
 *可能的选择：
 *
 *一次：将确保回调列表只能被触发一次（如延期）
 *
 * memory：将跟踪以前的值并将调用添加的任何回调
 *列表被立即用最新的“记忆”点燃后
 *值（如延期）
 *
 *唯一：将确保回调只能添加一次（列表中没有重复）
 *
 * stopOnFalse：当回调返回false时中断调用
 *
 * /
jQuery.Callbacks = function（options）{

	//如果需要，将选项从String格式转换为Object格式
	//（我们先检查缓存）
	options = typeof options ===“string”？
		createOptions（options）：
		jQuery.extend（{}，options）;

	var //标记列表当前是否正在触发的标志
		射击，

		//不可忘记列表的上次触发值
		记忆，

		//标记是否已触发列表
		解雇，

		//防止射击的旗帜
		锁定，

		//实际回调列表
		list = []，

		//可重复列表的执行数据队列
		queue = []，

		//当前触发回调的索引（根据需要通过添加/删除修改）
		firingIndex = -1，

		//消防回调
		fire = function（）{

			//强制单次射击
			locked = options.once;

			//为所有挂起的执行执行回调，
			//尊重firingIndex覆盖和运行时更改
			fired = firing = true;
			for（; queue.length; firingIndex = -1）{
				memory = queue.shift（）;
				while（++ firingIndex <list.length）{

					//运行回调并检查提前终止
					if（list [firingIndex] .apply（memory [0]，memory [1]）=== false &&
						options.stopOnFalse）{

						//跳转到结束并忘记数据，以便.add不会重新启动
						firingIndex = list.length;
						memory = false;
					}
				}
			}

			//如果我们完成了数据，请忘记数据
			if（！options.memory）{
				memory = false;
			}

			fired = false;

			//如果我们完成了射击，那就清理干净吧
			if（locked）{

				//如果我们有未来添加呼叫的数据，请保留一个空列表
				if（memory）{
					list = [];

				//否则，此对象已用完
				} else {
					list =“”;
				}
			}
		}，

		//实际回调对象
		self = {

			//将回调或回调集合添加到列表中
			add：function（）{
				if（list）{

					//如果我们有过去运行的记忆，我们应该在添加之后开火
					if（memory &&！firing）{
						firingIndex = list.length  -  1;
						queue.push（memory）;
					}

					（function add（args）{
						jQuery.each（args，function（_，arg）{
							if（jQuery.isFunction（arg））{
								if（！options.unique ||！self.has（arg））{
									list.push（arg）;
								}
							} else if（arg && arg.length && jQuery.type（arg）！==“string”）{

								//递归检查
								add（arg）;
							}
						}）;
					}）（参数）;

					if（memory &&！firing）{
						火（）;
					}
				}
				归还这个;
			}，

			//从列表中删除回调
			remove：function（）{
				jQuery.each（arguments，function（_，arg）{
					var index;
					while（（index = jQuery.inArray（arg，list，index））> -1）{
						list.splice（index，1）;

						//处理触发索引
						if（index <= firingIndex）{
							firingIndex--;
						}
					}
				}）;
				归还这个;
			}，

			//检查给定的回调是否在列表中。
			//如果没有给出参数，则返回list是否附加了回调。
			has：function（fn）{
				返回fn？
					jQuery.inArray（fn，list）> -1：
					list.length> 0;
			}，

			//从列表中删除所有回调
			empty：function（）{
				if（list）{
					list = [];
				}
				归还这个;
			}，

			//禁用.fire和.add
			//中止所有当前/待处理的执行
			//清除所有回调和值
			disable：function（）{
				locked = queue = [];
				list = memory =“”;
				归还这个;
			}，
			disabled：function（）{
				return！list;
			}，

			//禁用.fire
			//除非我们有内存（因为它没有效果），也禁用.add
			//中止所有待处理的执行
			lock：function（）{
				locked = true;
				if（！memory）{
					self.disable（）;
				}
				归还这个;
			}，
			已锁定：function（）{
				返回!!锁定;
			}，

			//使用给定的上下文和参数调用所有回调
			fireWith：function（context，args）{
				if（！locked）{
					args = args || [];
					args = [context，args.slice？args.slice（）：args];
					queue.push（args）;
					if（！firing）{
						火（）;
					}
				}
				归还这个;
			}，

			//使用给定的参数调用所有回调
			fire：function（）{
				self.fireWith（this，arguments）;
				归还这个;
			}，

			//知道回调函数是否至少被调用过一次
			fired：function（）{
				回来!!被解雇
			}
		};

	回归自我;
};


jQuery.extend（{

	延期：function（func）{
		var tuples = [

				//动作，添加监听器，监听器列表，最终状态
				[“resolve”，“done”，jQuery.Callbacks（“曾经记忆”），“已解决”]，
				[“拒绝”，“失败”，jQuery.Callbacks（“一次记忆”），“拒绝”]，
				[“notify”，“progress”，jQuery.Callbacks（“memory”）]
			]
			state =“pending”，
			promise = {
				state：function（）{
					返回状态;
				}，
				always：function（）{
					deferred.done（arguments）.fail（arguments）;
					归还这个;
				}，
				then：function（/ * fnDone，fnFail，fnProgress * /）{
					var fns = arguments;
					return jQuery.Deferred（function（newDefer）{
						jQuery.each（元组，函数（i，tuple）{
							var fn = jQuery.isFunction（fns [i]）&& fns [i];

							//延迟[完成| 失败| 用于将动作转发到newDefer的进度]
							deferred [tuple [1]]（function（）{
								var returns = fn && fn.apply（this，arguments）;
								if（返回&& jQuery.isFunction（returned.promise））{
									returned.promise（）
										.progress（newDefer.notify）
										.done（newDefer.resolve）
										.fail（newDefer.reject）;
								} else {
									newDefer [tuple [0] +“With”]（
										这个===承诺？newDefer.promise（）：这个，
										fn？[返回]：争论
									）;
								}
							}）;
						}）;
						fns = null;
					} ）。诺言（）;
				}，

				//获得延期的承诺
				//如果提供了obj，则将promise方面添加到对象中
				promise：function（obj）{
					return obj！= null？jQuery.extend（obj，promise）：promise;
				}
			}，
			deferred = {};

		//保持管道以进行反算
		promise.pipe = promise.then;

		//添加特定于列表的方法
		jQuery.each（元组，函数（i，tuple）{
			var list = tuple [2]，
				stateString = tuple [3];

			//承诺[完成| 失败| 进展] = list.add
			promise [tuple [1]] = list.add;

			//处理状态
			if（stateString）{
				list.add（function（）{

					// state = [已解决| 被拒绝 ]
					state = stateString;

				// [reject_list | resolve_list] .disable; progress_list.lock
				}，tuples [i ^ 1] [2] .disable，tuples [2] [2] .lock）;
			}

			//延迟[resolve | 拒绝| 通知]
			deferred [tuple [0]] = function（）{
				deferred [tuple [0] +“With”]（这= = deferred？promise：this，arguments）;
				归还这个;
			};
			deferred [tuple [0] +“With”] = list.fireWith;
		}）;

		//使延期承诺
		promise.promise（延期）;

		//如果有的话，调用给定的func
		if（func）{
			func.call（延迟，延期）;
		}

		// 全部完成！
		退货延期;
	}，

	//延期帮助者
	when：function（subordinate / *，...，subordinateN * /）{
		var i = 0，
			resolveValues = slice.call（arguments），
			length = resolveValues.length，

			//未完成的下属的数量
			剩余=长度！== 1 ||
				（subordinate && jQuery.isFunction（subordinate.promise））？长度：0，

			//主人延期。
			//如果resolveValues只包含一个Deferred，那就使用它。
			延迟=剩余=== 1？subordinate：jQuery.Deferred（），

			//更新解析和进度值的功能
			updateFunc = function（i，contexts，values）{
				return函数（值）{
					上下文[i] =这个;
					values [i] = arguments.length> 1？slice.call（arguments）：value;
					if（values === progressValues）{
						deferred.notifyWith（contexts，values）;

					} else if（！（--remaining））{
						deferred.resolveWith（contexts，values）;
					}
				};
			}，

			progressValues，progressContexts，resolveContexts;

		//将侦听器添加到Deferred下属; 把别人视为已解决
		if（length> 1）{
			progressValues = new Array（length）;
			progressContexts = new Array（length）;
			resolveContexts = new Array（length）;
			for（; i <length; i ++）{
				if（resolveValues [i] && jQuery.isFunction（resolveValues [i] .promise））{
					resolveValues [i] .promise（）
						.progress（updateFunc（i，progressContexts，progressValues））
						.done（updateFunc（i，resolveContexts，resolveValues））
						.fail（deferred.reject）;
				} else {
					--remaining;
				}
			}
		}

		//如果我们不等任何事情，请解决主人问题
		if（！remaining）{
			deferred.resolveWith（resolveContexts，resolveValues）;
		}

		return deferred.promise（）;
	}
}）;


//在DOM准备就绪时使用的延迟
var readyList;

jQuery.fn.ready = function（fn）{

	//添加回调
	jQuery.ready.promise（）。done（fn）;

	归还这个;
};

jQuery.extend（{

	// DOM是否可以使用？一旦发生，设置为true。
	isReady：false，

	//一个计数器，用于跟踪之前要等待的项目数
	//就绪事件触发 见＃6781
	readyWait：1，

	//保持（或释放）就绪事件
	holdReady：function（hold）{
		if（hold）{
			jQuery.readyWait ++;
		} else {
			jQuery.ready（true）;
		}
	}，

	// DOM准备就绪时处理
	ready：function（wait）{

		//如果有待处理的暂停或我们已经准备就绪，则中止
		if（wait === true？--jQuery.readyWait：jQuery.isReady）{
			返回;
		}

		//记住DOM准备好了
		jQuery.isReady = true;

		//如果正常的DOM Ready事件被触发，减少，并在需要时等待
		if（等等！== true && --jQuery.readyWait> 0）{
			返回;
		}

		//如果有绑定的函数，则执行
		readyList.resolveWith（document，[jQuery]）;

		//触发任何绑定的就绪事件
		if（jQuery.fn.triggerHandler）{
			jQuery（document）.triggerHandler（“ready”）;
			jQuery（document）.off（“ready”）;
		}
	}
}）;

/ **
 * dom ready事件的清理方法
 * /
function detach（）{
	if（document.addEventListener）{
		document.removeEventListener（“DOMContentLoaded”，已完成）;
		window.removeEventListener（“load”，completed）;

	} else {
		document.detachEvent（“onreadystatechange”，已完成）;
		window.detachEvent（“onload”，已完成）;
	}
}

/ **
 * ready事件处理程序和自清理方法
 * /
function completed（）{

	// readyState ===“完成”足以让我们在oldIE中调用dom
	if（document.addEventListener ||
		window.event.type ===“load”||
		document.readyState ===“complete”）{

		分离（）;
		jQuery.ready（）;
	}
}

jQuery.ready.promise = function（obj）{
	if（！readyList）{

		readyList = jQuery.Deferred（）;

		//捕获调用$（document）.ready（）的情况
		//在浏览器事件发生后。
		//支持：IE6-10
		//较旧的IE有时会过早发出“交互式”信号
		if（document.readyState ===“complete”||
			（document.readyState！==“loading”&&！document.documentElement.doScroll））{

			//异步处理它以使脚本有机会延迟准备
			window.setTimeout（jQuery.ready）;

		//基于标准的浏览器支持DOMContentLoaded
		} else if（document.addEventListener）{

			//使用方便的事件回调
			document.addEventListener（“DOMContentLoaded”，已完成）;

			//回退到window.onload，这将始终有效
			window.addEventListener（“load”，completed）;

		//如果使用IE事件模型
		} else {

			//确保在onload之前进行射击，可能会延迟，但对于iframe也是安全的
			document.attachEvent（“onreadystatechange”，已完成）;

			//回退到window.onload，这将始终有效
			window.attachEvent（“onload”，已完成）;

			//如果IE而不是框架
			//不断检查文档是否准备就绪
			var top = false;

			尝试{
				top = window.frameElement == null && document.documentElement;
			} catch（e）{}

			if（top && top.doScroll）{
				（function doScrollCheck（）{
					if（！jQuery.isReady）{

						尝试{

							//使用Diego Perini的技巧
							// http://javascript.nwbox.com/IEContentLoaded/
							top.doScroll（“左”）;
						} catch（e）{
							return window.setTimeout（doScrollCheck，50）;
						}

						//分离所有dom准备好的事件
						分离（）;

						//并执行任何等待函数
						jQuery.ready（）;
					}
				}）（）;
			}
		}
	}
	return readyList.promise（obj）;
};

//即使用户没有，也要启动DOM就绪检查
jQuery.ready.promise（）;




//支持：IE <9
//在对象的继承属性之前迭代它自己的属性
var i;
for（i in jQuery（support））{
	打破;
}
support.ownFirst = i ===“0”;

//注意：大多数支持测试都在各自的模块中定义。
//在测试运行之前为false
support.inlineBlockNeedsLayout = false;

//如果我们需要设置body.style.zoom，请执行ASAP
jQuery（function（）{

	//缩小：var a，b，c，d
	var val，div，body，container;

	body = document.getElementsByTagName（“body”）[0];
	if（！body ||！body.style）{

		//返回没有正文的框架集文档
		返回;
	}

	// 建立
	div = document.createElement（“div”）;
	container = document.createElement（“div”）;
	container.style.cssText =“position：absolute; border：0; width：0; height：0; top：0; left：-9999px”;
	body.appendChild（container）.appendChild（div）;

	if（typeof div.style.zoom！==“undefined”）{

		//支持：IE <8
		//检查本机块级元素是否像内联块一样
		//将元素设置为“内联”并给予时的元素
		//他们的布局
		div.style.cssText =“display：inline; margin：0; border：0; padding：1px; width：1px; zoom：1”;

		support.inlineBlockNeedsLayout = val = div.offsetWidth === 3;
		if（val）{

			//防止IE 6影响定位元素＃11048的布局
			//防止IE在IE 7模式下缩小正文＃12869
			//支持：IE <8
			body.style.zoom = 1;
		}
	}

	body.removeChild（container）;
}）;


（function（）{
	var div = document.createElement（“div”）;

	//支持：IE <9
	support.deleteExpando = true;
	尝试{
		删除div.test;
	} catch（e）{
		support.deleteExpando = false;
	}

	//空元素以避免IE中的泄漏。
	div = null;
}）（）;
var acceptData = function（elem）{
	var noData = jQuery.noData [（elem.nodeName +“”）。toLowerCase（）]，
		nodeType = + elem.nodeType || 1;

	//不要在非元素DOM节点上设置数据，因为它不会被清除（＃8335）。
	return nodeType！== 1 && nodeType！== 9？
		假的：

		//除非另有说明，否则节点接受数据; 拒绝可以是有条件的
		！noData || noData！== true && elem.getAttribute（“classid”）=== noData;
};




var rbrace = / ^（？：\ {[\ w \ W] * \} | \ [[\ w \ W] * \]）$ /，
	rmultiDash = /（[AZ]）/ g;

function dataAttr（elem，key，data）{

	//如果在内部找不到任何内容，请尝试获取任何内容
	//来自HTML5 data- *属性的数据
	if（data === undefined && elem.nodeType === 1）{

		var name =“data-”+ key.replace（rmultiDash，“ -  $ 1”）。toLowerCase（）;

		data = elem.getAttribute（name）;

		if（typeof data ===“string”）{
			尝试{
				data = data ===“true”？是的：
					data ===“false”？假的：
					data ===“null”？空值 ：

					//如果不更改字符串，则仅转换为数字
					+ data +“”===数据？+数据：
					rbrace.test（数据）？jQuery.parseJSON（数据）：
					数据;
			} catch（e）{}

			//确保我们设置数据，以便以后不会更改
			jQuery.data（elem，key，data）;

		} else {
			data = undefined;
		}
	}

	返回数据;
}

//检查缓存对象是否空虚
function isEmptyDataObject（obj）{
	var name;
	for（obj中的名字）{

		//如果公共数据对象为空，则private仍为空
		if（name ===“data”&& jQuery.isEmptyObject（obj [name]））{
			继续;
		}
		if（name！==“toJSON”）{
			返回false;
		}
	}

	返回true;
}

function internalData（elem，name，data，pvt / *仅供内部使用* /）{
	if（！acceptData（elem））{
		返回;
	}

	var ret，thisCache，
		internalKey = jQuery.expando，

		//我们必须以不同的方式处理DOM节点和JS对象，因为IE6-7
		//无法通过DOM-JS边界正确引用GC对象
		isNode = elem.nodeType，

		//只有DOM节点需要全局jQuery缓存; JS对象数据是
		//直接附加到对象，因此GC可以自动发生
		cache = isNode？jQuery.cache：elem，

		//仅在JS对象的缓存已存在时才定义其ID
		//与没有缓存的DOM节点在同一路径上快捷方式的代码
		id = isNode？elem [internalKey]：elem [internalKey] && internalKey;

	//在尝试获取数据时，避免做任何比我们需要的工作更多的工作
	//根本没有数据的对象
	if（（！id ||！cache [id] ||（！pvt &&！cache [id] .data））&&
		data === undefined && typeof name ===“string”）{
		返回;
	}

	if（！id）{

		//只有DOM节点需要为每个元素提供一个新的唯一ID，因为它们的数据
		//最终在全局缓存中
		if（isNode）{
			id = elem [internalKey] = deletedIds.pop（）|| jQuery.guid ++;
		} else {
			id = internalKey;
		}
	}

	if（！cache [id]）{

		//避免在对象上暴露普通JS对象上的jQuery元数据
		//使用JSON.stringify序列化
		cache [id] = isNode？{}：{toJSON：jQuery.noop};
	}

	//可以将对象传递给jQuery.data而不是键/值对; 这得到了
	//浅被复制到现有缓存上
	if（typeof name ===“object”|| typeof name ===“function”）{
		if（pvt）{
			cache [id] = jQuery.extend（cache [id]，name）;
		} else {
			cache [id] .data = jQuery.extend（cache [id] .data，name）;
		}
	}

	thisCache = cache [id];

	// jQuery data（）存储在对象内部数据中的单独对象中
	//缓存以避免内部数据与用户定义之间的密钥冲突
	//数据
	if（！pvt）{
		if（！thisCache.data）{
			thisCache.data = {};
		}

		thisCache = thisCache.data;
	}

	if（data！== undefined）{
		thisCache [jQuery.camelCase（name）] = data;
	}

	//检查转换为camel和未转换的数据属性名称
	//如果指定了数据属性
	if（typeof name ===“string”）{

		//首先尝试查找原样属性数据
		ret = thisCache [name];

		//测试null |未定义的属性数据
		if（ret == null）{

			//尝试找到camelCased属性
			ret = thisCache [jQuery.camelCase（name）];
		}
	} else {
		ret = thisCache;
	}

	返回;
}

function internalRemoveData（elem，name，pvt）{
	if（！acceptData（elem））{
		返回;
	}

	var thisCache，i，
		isNode = elem.nodeType，

		//有关更多信息，请参阅jQuery.data
		cache = isNode？jQuery.cache：elem，
		id = isNode？elem [jQuery.expando]：jQuery.expando;

	//如果此对象已经没有缓存条目，则没有
	//继续目的
	if（！cache [id]）{
		返回;
	}

	if（name）{

		thisCache = pvt？cache [id]：cache [id] .data;

		if（thisCache）{

			//支持数据键的数组或空格分隔的字符串名称
			if（！jQuery.isArray（name））{

				//在任何操作之前尝试将字符串作为键
				if（thisCache中的名字）{
					name = [name];
				} else {

					//除非存在带空格的键，否则用空格分割驼峰版本
					name = jQuery.camelCase（name）;
					if（thisCache中的名字）{
						name = [name];
					} else {
						name = name.split（“”）;
					}
				}
			} else {

				//如果“name”是一个键数组......
				//最初创建数据时，通过（“key”，“val”）签名，
				//键将转换为camelCase。
				//由于没有办法告诉_how_添加了一个键，删除
				//都是普通键和camelCase键。＃12786
				//这只会惩罚数组参数路径。
				name = name.concat（jQuery.map（name，jQuery.camelCase））;
			}

			i = name.length;
			当我 -  ） {
				删除thisCache [name [i]];
			}

			//如果缓存中没有剩余数据，我们希望继续
			//让缓存对象本身被破坏
			if（pvt ?! isEmptyDataObject（thisCache）:! jQuery.isEmptyObject（thisCache））{
				返回;
			}
		}
	}

	//有关更多信息，请参阅jQuery.data
	if（！pvt）{
		delete cache [id] .data;

		//除非内部数据对象，否则不要销毁父缓存
		//是唯一遗留下来的东西
		if（！isEmptyDataObject（cache [id]））{
			返回;
		}
	}

	//销毁缓存
	if（isNode）{
		jQuery.cleanData（[elem]，true）;

	//当支持expandos时使用delete，或者`cache`不是每个isWindow的窗口（＃10080）
	/ * jshint eqeqeq：false * /
	} else if（support.deleteExpando || cache！= cache.window）{
		/ * jshint eqeqeq：true * /
		delete cache [id];

	//当其他所有方法都失败时，未定义
	} else {
		cache [id] = undefined;
	}
}

jQuery.extend（{
	缓存：{}，

	//以下元素（以空格为后缀以避免Object.prototype冲突）
	//如果您尝试设置expando属性，则抛出无法捕获的异常
	没有数据： {
		“小程序”：是的，
		“嵌入”：是的，

		// ...但Flash对象（具有此classid）*可以*处理expandos
		“对象”：“clsid：D27CDB6E-AE6D-11cf-96B8-444553540000”
	}，

	hasData：function（elem）{
		elem = elem.nodeType？jQuery.cache [elem [jQuery.expando]]：elem [jQuery.expando];
		return !! elem &&！isE​​mptyDataObject（elem）;
	}，

	data：function（elem，name，data）{
		return internalData（elem，name，data）;
	}，

	removeData：function（elem，name）{
		return internalRemoveData（elem，name）;
	}，

	// 仅限内部使用。
	_data：function（elem，name，data）{
		return internalData（elem，name，data，true）;
	}，

	_removeData：function（elem，name）{
		return internalRemoveData（elem，name，true）;
	}
}）;

jQuery.fn.extend（{
	data：function（key，value）{
		var i，名称，数据，
			elem = this [0]，
			attrs = elem && elem.attributes;

		// .data的特殊版本基本上阻止了jQuery.access，
		//所以自己实施相关行为

		//获取所有值
		if（key === undefined）{
			if（this.length）{
				data = jQuery.data（elem）;

				if（elem.nodeType === 1 &&！jQuery._data（elem，“parsedAttrs”））{
					i = attrs.length;
					当我 -  ） {

						//支持：IE11 +
						// attrs元素可以为null（＃14894）
						if（attrs [i]）{
							name = attrs [i] .name;
							if（name.indexOf（“data-”）=== 0）{
								name = jQuery.camelCase（name.slice（5））;
								dataAttr（elem，name，data [name]）;
							}
						}
					}
					jQuery._data（elem，“parsedAttrs”，true）;
				}
			}

			返回数据;
		}

		//设置多个值
		if（typeof key ===“object”）{
			return this.each（function（）{
				jQuery.data（this，key）;
			}）;
		}

		return arguments.length> 1？

			//设置一个值
			this.each（function（）{
				jQuery.data（this，key，value）;
			}）：

			//获取一个值
			//首先尝试获取任何内部存储的数据
			元素？dataAttr（elem，key，jQuery.data（elem，key））：undefined;
	}，

	removeData：function（key）{
		return this.each（function（）{
			jQuery.removeData（this，key）;
		}）;
	}
}）;


jQuery.extend（{
	queue：function（elem，type，data）{
		var queue;

		if（elem）{
			type =（type ||“fx”）+“queue”;
			queue = jQuery._data（elem，type）;

			//如果这只是一次查找，可以通过快速退出来加速出队
			if（data）{
				if（！queue || jQuery.isArray（data））{
					queue = jQuery._data（elem，type，jQuery.makeArray（data））;
				} else {
					queue.push（data）;
				}
			}
			返回队列|| [];
		}
	}，

	dequeue：function（elem，type）{
		type = type || “FX”;

		var queue = jQuery.queue（elem，type），
			startLength = queue.length，
			fn = queue.shift（），
			hooks = jQuery._queueHooks（elem，type），
			next = function（）{
				jQuery.dequeue（elem，type）;
			};

		//如果fx队列出列，请始终删除进度sentinel
		if（fn ===“inprogress”）{
			fn = queue.shift（）;
			startLength--;
		}

		if（fn）{

			//添加进度sentinel以防止fx队列进入
			//自动出列
			if（type ===“fx”）{
				queue.unshift（“inprogress”）;
			}

			//清除最后一个队列停止功能
			delete hooks.stop;
			fn.call（elem，next，hooks）;
		}

		if（！startLength && hooks）{
			hooks.empty.fire（）;
		}
	}，

	//不打算供公众使用 - 生成queueHooks对象，
	//或返回当前的那个
	_queueHooks：function（elem，type）{
		var key = type +“queueHooks”;
		返回jQuery._data（elem，key）|| jQuery._data（elem，key，{
			empty：jQuery.Callbacks（“once memory”）。add（function（）{
				jQuery._removeData（elem，type +“queue”）;
				jQuery._removeData（elem，key）;
			}）
		}）;
	}
}）;

jQuery.fn.extend（{
	queue：function（type，data）{
		var setter = 2;

		if（typeof type！==“string”）{
			data = type;
			type =“fx”;
			setter--;
		}

		if（arguments.length <setter）{
			return jQuery.queue（this [0]，type）;
		}

		返回数据=== undefined？
			这个 ：
			this.each（function（）{
				var queue = jQuery.queue（this，type，data）;

				//确保此队列的挂钩
				jQuery._queueHooks（this，type）;

				if（type ===“fx”&& queue [0]！==“inprogress”）{
					jQuery.dequeue（this，type）;
				}
			}）;
	}，
	dequeue：function（type）{
		return this.each（function（）{
			jQuery.dequeue（this，type）;
		}）;
	}，
	clearQueue：function（type）{
		return this.queue（type ||“fx”，[]）;
	}，

	//获取某个类型的队列时解析的承诺
	//被清空（默认情况下fx是类型）
	promise：function（type，obj）{
		var tmp，
			count = 1，
			defer = jQuery.Deferred（），
			elements = this，
			i = this.length，
			resolve = function（）{
				if（！（ -  count））{
					defer.resolveWith（elements，[elements]）;
				}
			};

		if（typeof type！==“string”）{
			obj = type;
			type = undefined;
		}
		type = type || “FX”;

		当我 -  ） {
			tmp = jQuery._data（elements [i]，type +“queueHooks”）;
			if（tmp && tmp.empty）{
				计数++;
				tmp.empty.add（resolve）;
			}
		}
		解决（）;
		return defer.promise（obj）;
	}
}）;


（function（）{
	var shrinkWrapBlocksVal;

	support.shrinkWrapBlocks = function（）{
		if（shrinkWrapBlocksVal！= null）{
			return shrinkWrapBlocksVal;
		}

		//如果需要，稍后会更改。
		shrinkWrapBlocksVal = false;

		//缩小：var b，c，d
		var div，body，container;

		body = document.getElementsByTagName（“body”）[0];
		if（！body ||！body.style）{

			//测试过早或在不受支持的环境中启动，退出。
			返回;
		}

		// 建立
		div = document.createElement（“div”）;
		container = document.createElement（“div”）;
		container.style.cssText =“position：absolute; border：0; width：0; height：0; top：0; left：-9999px”;
		body.appendChild（container）.appendChild（div）;

		//支持：IE6
		//检查带有布局的元素是否收缩包装其子元素
		if（typeof div.style.zoom！==“undefined”）{

			//重置CSS：box-sizing; 显示; 余量; 边界
			div.style.cssText =

				//支持：Firefox <29，Android 2.3
				//供应商前缀框大小调整
				“-webkit-盒大小：内容箱; -moz-箱大小：内容箱;” +
				“箱式施胶：内容盒;显示：块;边缘：0;边界：0;” +
				“填充：1px的;宽度：1px的;缩放：1”;
			div.appendChild（document.createElement（“div”））。style.width =“5px”;
			shrinkWrapBlocksVal = div.offsetWidth！== 3;
		}

		body.removeChild（container）;

		return shrinkWrapBlocksVal;
	};

}）（）;
var pnum =（/ [+  - ]？（？：[d *。*] \ d +（？：[eE] [+  - ]？\ d+ |）/）。source;

var rcssNum = new RegExp（“^（？:( [+  - ]）= |）（”+ pnum +“）（[az％] *）$”，“i”）;


var cssExpand = [“Top”，“Right”，“Bottom”，“Left”];

var isHidden = function（elem，el）{

		// isHidden可能是从jQuery＃filter函数调用的;
		//在这种情况下，元素将是第二个参数
		elem = el || ELEM;
		return jQuery.css（elem，“display”）===“none”||
			！jQuery.contains（elem.ownerDocument，elem）;
	};



function adjustCSS（elem，prop，valueParts，tween）{
	var调整，
		scale = 1，
		maxIterations = 20，
		currentValue =补间？
			function（）{return tween.cur（）; }：
			function（）{return jQuery.css（elem，prop，“”）; }，
		initial = currentValue（），
		unit = valueParts && valueParts [3] || （jQuery.cssNumber [prop]？“”：“px”），

		//潜在的单位不匹配需要起始值计算
		initialInUnit =（jQuery.cssNumber [prop] || unit！==“px”&& + initial）&&
			rcssNum.exec（jQuery.css（elem，prop））;

	if（initialInUnit && initialInUnit [3]！== unit）{

		// jQuery.css报告的信任单位
		unit = unit || initialInUnit [3];

		//确保我们稍后更新补间属性
		valueParts = valueParts || [];

		//从非零起点迭代逼近
		initialInUnit = + initial || 1;

		做{

			//如果上一次迭代归零，则加倍，直到得到*某些东西*。
			//使用字符串加倍，这样我们就不会意外地看到下面的比例不变
			scale = scale || ” 0.5" ;

			//调整并应用
			initialInUnit = initialInUnit / scale;
			jQuery.style（elem，prop，initialInUnit + unit）;

		//更新比例，从tween.cur（）容忍零或NaN
		//如果比例没有变化或完美，或者我们刚刚受够了，就打破循环。
		而（
			scale！==（scale = currentValue（）/ initial）&& scale！== 1 && --maxIterations
		）;
	}

	if（valueParts）{
		initialInUnit = + initialInUnit || +初始|| 0;

		//如果指定，则应用相对偏移量（+ = /  -  =）
		adjust = valueParts [1]？
			initialInUnit +（valueParts [1] + 1）* valueParts [2]：
			+ valueParts [2];
		if（tween）{
			tween.unit = unit ;
			tween.start = initialInUnit;
			tween.end =调整;
		}
	}
	返回调整;
}


//获取和设置集合值的多功能方法
//如果值是函数，则可以选择执行值/ s
var access = function（elems，fn，key，value，chainable，emptyGet，raw）{
	var i = 0，
		length = elems.length，
		bulk = key == null;

	//设置许多值
	if（jQuery.type（key）===“object”）{
		chainable = true;
		for（i in key）{
			访问（elems，fn，i，key [i]，true，emptyGet，raw）;
		}

	//设置一个值
	} else if（value！== undefined）{
		chainable = true;

		if（！jQuery.isFunction（value））{
			raw = true;
		}

		if（bulk）{

			//批量操作针对整个集合运行
			if（raw）{
				fn.call（elems，value）;
				fn = null;

			// ...执行函数值时除外
			} else {
				bulk = fn;
				fn = function（elem，key，value）{
					return bulk.call（jQuery（elem），value）;
				};
			}
		}

		if（fn）{
			for（; i <length; i ++）{
				FN（
					elems [i]，
					键，
					生的 ？value：value.call（elems [i]，i，fn（elems [i]，key））
				）;
			}
		}
	}

	可以回归？
		元素：

		//获取
		块 ？
			fn.call（elems）：
			长度 ？fn（elems [0]，key）：emptyGet;
};
var rcheckableType =（/ ^（？：checkbox | radio）$ / i）;

var rtagName =（/ <（[\ w： - ] +）/）;

var rscriptType =（/ ^ $ | \ /（？：java | ecma）script / i）;

var rleadingWhitespace =（/ ^ \ s + /）;

var nodeNames =“abbr | article | aside | audio | bdi | canvas | data | datalist |” +
		“细节|对话框| figcaption |图|页脚|头| hgroup |主|” +
		“标志|仪表|导航|输出|图片|进展|部分|摘要|模板|时间|视频”;



function createSafeFragment（document）{
	var list = nodeNames.split（“|”），
		safeFrag = document.createDocumentFragment（）;

	if（safeFrag.createElement）{
		while（list.length）{
			safeFrag.createElement（
				list.pop（）
			）;
		}
	}
	return safeFrag;
}


（function（）{
	var div = document.createElement（“div”），
		fragment = document.createDocumentFragment（），
		input = document.createElement（“input”）;

	// 建立
	div.innerHTML =“<link /> <table> </ table> <a href='/a'> a </a> <input type ='checkbox'/>”;

	//当使用.innerHTML时，IE会删除前导空格
	support.leadingWhitespace = div.firstChild.nodeType === 3;

	//确保不会自动插入tbody元素
	// IE会将它们插入空表中
	support.tbody =！div.getElementsByTagName（“tbody”）。length;

	//确保链接元素由innerHTML正确序列化
	//这需要IE中的包装元素
	support.htmlSerialize = !! div.getElementsByTagName（“link”）。length;

	//确保克隆html5元素不会导致问题
	//未定义outerHTML，这仍然有效
	support.html5Clone =
		document.createElement（“nav”）。cloneNode（true）.outerHTML！==“<：nav> </：nav>”;

	//检查断开连接的复选框是否会保留其选中状态
	//附加到DOM后的值为true（IE6 / 7）
	input.type =“复选框”;
	input.checked = true;
	fragment.appendChild（input）;
	support.appendChecked = input.checked;

	//确保正确克隆textarea（和复选框）defaultValue
	//支持：IE6-IE11 +
	div.innerHTML =“<textarea> x </ textarea>”;
	support.noCloneChecked = !! div.cloneNode（true）.lastChild.defaultValue;

	//＃11217  - 当名称在checked属性之后时，WebKit将丢失检查
	fragment.appendChild（div）;

	//支持：Windows Web Apps（WWA）
	//`name`和`type`必须使用.setAttribute for WWA（＃14901）
	input = document.createElement（“input”）;
	input.setAttribute（“type”，“radio”）;
	input.setAttribute（“checked”，“checked”）;
	input.setAttribute（“name”，“t”）;

	div.appendChild（输入）;

	//支持：Safari 5.1，iOS 5.1，Android 4.x，Android 2.3
	//旧的WebKit不会在片段中正确克隆已检查状态
	support.checkClone = div.cloneNode（true）.cloneNode（true）.lastChild.checked;

	//支持：IE <9
	//克隆元素保留了attachEvent处理程序，我们在IE9 +上使用addEventListener
	support.noCloneEvent = !! div.addEventListener;

	//支持：IE <9
	//由于IE中的属性和属性相同，
	// cleanData必须将属性设置为undefined，而不是使用removeAttribute
	div [jQuery.expando] = 1;
	support.attributes =！div.getAttribute（jQuery.expando）;
}）（）;


//我们必须关闭这些标签才能支持XHTML（＃13200）
var wrapMap = {
	选项：[1，“<select multiple ='multiple'>”，“</ select>”]，
	图例：[1，“<fieldset>”，“</ fieldset>”]，
	area：[1，“<map>”，“</ map>”]，

	//支持：IE8
	param：[1，“<object>”，“</ object>”]，
	thead：[1，“<table>”，“</ table>”]，
	tr：[2，“<table> <tbody>”，“</ tbody> </ table>”]，
	col：[2，“<table> <tbody> </ tbody> <colgroup>”，“</ colgroup> </ table>”]，
	td：[3，“<table> <tbody> <tr>”，“</ tr> </ tbody> </ table>”]，

	// IE6-8无法序列化链接，脚本，样式或任何html5（NoScope）标记，
	//除非包含在前面有非破坏字符的div中。
	_default：support.htmlSerialize？[0，“”，“”]：[1，“X <div>”，“</ div>”]
};

//支持：IE8-IE9
wrapMap.optgroup = wrapMap.option;

wrapMap.tbody = wrapMap.tfoot = wrapMap.colgroup = wrapMap.caption = wrapMap.thead;
wrapMap.th = wrapMap.td;


function getAll（context，tag）{
	var elems，elem，
		i = 0，
		found = typeof context.getElementsByTagName！==“undefined”？
			context.getElementsByTagName（tag ||“*”）：
			typeof context.querySelectorAll！==“undefined”？
				context.querySelectorAll（tag ||“*”）：
				不确定的;

	if（！found）{
		for（found = []，elems = context.childNodes || context;
			（elem = elems [i]）！= null;
			我++
		）{
			if（！tag || jQuery.nodeName（elem，tag））{
				found.push（elem）;
			} else {
				jQuery.merge（found，getAll（elem，tag））;
			}
		}
	}

	return tag === undefined || tag && jQuery.nodeName（context，tag）？
		jQuery.merge（[context]，found）：
		发现;
}


//将脚本标记为已经过评估
function setGlobalEval（elems，refElements）{
	var elem，
		i = 0;
	for（;（elem = elems [i]）！= null; i ++）{
		jQuery._data（
			ELEM，
			“globalEval”
			！refElements || jQuery._data（refElements [i]，“globalEval”）
		）;
	}
}


var rhtml = / <|＆＃？\ w +; /，
	rtbody = / <tbody / i;

function fixDefaultChecked（elem）{
	if（rcheckableType.test（elem.type））{
		elem.defaultChecked = elem.checked;
	}
}

function buildFragment（elems，context，scripts，selection，ignored）{
	var j，elem，contains，
		tmp，tag，tbody，wrap，
		l = elems.length，

		//确保安全的片段
		safe = createSafeFragment（context），

		nodes = []，
		i = 0;

	for（; i <l; i ++）{
		elem = elems [i];

		if（elem || elem === 0）{

			//直接添加节点
			if（jQuery.type（elem）===“object”）{
				jQuery.merge（nodes，elem.nodeType？[elem]：elem）;

			//将非html转换为文本节点
			} else if（！rhtml.test（elem））{
				nodes.push（context.createTextNode（elem））;

			//将html转换为DOM节点
			} else {
				tmp = tmp || safe.appendChild（context.createElement（“div”））;

				//反序列化标准表示
				tag =（rtagName.exec（elem）|| [“”，“”]）[1] .toLowerCase（）;
				wrap = wrapMap [tag] || wrapMap._default;

				tmp.innerHTML = wrap [1] + jQuery.htmlPrefilter（elem）+ wrap [2];

				//通过包装器下降到正确的内容
				j = wrap [0];
				while（j--）{
					tmp = tmp.lastChild;
				}

				//手动添加IE删除的前导空格
				if（！support.leadingWhitespace && rleadingWhitespace.test（elem））{
					nodes.push（context.createTextNode（rleadingWhitespace.exec（elem）[0]））;
				}

				//从表片段中删除IE的autoinserted <tbody>
				if（！support.tbody）{

					// String是<table>，* may *有假<tbody>
					elem = tag ===“table”&&！rtbody.test（elem）？
						tmp.firstChild：

						// String是一个裸<thead>或<tfoot>
						wrap [1] ===“<table>”&&！rtbody.test（elem）？
							tmp：
							0;

					j = elem && elem.childNodes.length;
					while（j--）{
						if（jQuery.nodeName（（tbody = elem.childNodes [j]），“tbody”）&&
							！tbody.childNodes.length）{

							elem.removeChild（tbody）;
						}
					}
				}

				jQuery.merge（nodes，tmp.childNodes）;

				//修复＃12392 for WebKit和IE> 9
				tmp.textContent =“”;

				//修复＃12392 for oldIE
				while（tmp.firstChild）{
					tmp.removeChild（tmp.firstChild）;
				}

				//记住顶级容器以进行适当的清理
				tmp = safe.lastChild;
			}
		}
	}

	//修复＃11356：清除片段中的元素
	if（tmp）{
		safe.removeChild（tmp）;
	}

	//为任何无线电和复选框重置defaultChecked
	//即将被附加到IE 6/7中的DOM（＃8060）
	if（！support.appendChecked）{
		jQuery.grep（getAll（nodes，“input”），fixDefaultChecked）;
	}

	i = 0;
	while（（elem = nodes [i ++]））{

		//跳过上下文集合中已有的元素（trac-4087）
		if（selection && jQuery.inArray（elem，selection）> -1）{
			if（ignored）{
				ignored.push（elem）;
			}

			继续;
		}

		contains = jQuery.contains（elem.ownerDocument，elem）;

		//附加到片段
		tmp = getAll（safe.appendChild（elem），“script”）;

		//保留脚本评估历史记录
		if（contains）{
			setGlobalEval（tmp）;
		}

		//捕获可执行文件
		if（scripts）{
			j = 0;
			while（（elem = tmp [j ++]））{
				if（rscriptType.test（elem.type ||“”））{
					scripts.push（elem）;
				}
			}
		}
	}

	tmp = null;

	返回安全;
}


（function（）{
	var i，eventName，
		div = document.createElement（“div”）;

	//支持：IE <9（缺少提交/更改泡泡），Firefox（缺少焦点（in | out）事件）
	for（i in {submit：true，change：true，focusin：true}）{
		eventName =“on”+ i;

		if（！（在窗口中支持[i] = eventName））{

			//谨防CSP限制（https://developer.mozilla.org/en/Security/CSP）
			div.setAttribute（eventName，“t”）;
			support [i] = div.attributes [eventName] .expando === false;
		}
	}

	//空元素以避免IE中的泄漏。
	div = null;
}）（）;


var rformElems = / ^（？：input | select | textarea）$ / i，
	rkeyEvent = / ^ key /，
	rmouseEvent = / ^（？：mouse | pointer | contextmenu | drag | drop）| click /，
	rfocusMorph = / ^（？：focusinfocus | focusoutblur）$ /，
	rtypenamespace = /^([^.]*)(?:\。（。+）|）/;

function returnTrue（）{
	返回true;
}

function returnFalse（）{
	返回false;
}

//支持：IE9
//有关详细信息，请参阅＃13393
function safeActiveElement（）{
	尝试{
		return document.activeElement;
	} catch（err）{}
}

函数on（elem，types，selector，data，fn，one）{
	var origFn，type;

	//类型可以是类型/处理程序的映射
	if（typeof types ===“object”）{

		//（类型 - 对象，选择器，数据）
		if（typeof selector！==“string”）{

			//（类型 - 对象，数据）
			data = data || 选择;
			selector = undefined;
		}
		for（type in types）{
			on（elem，type，selector，data，types [type]，one）;
		}
		返回元素;
	}

	if（data == null && fn == null）{

		//（类型，fn）
		fn =选择器;
		data = selector = undefined;
	} else if（fn == null）{
		if（typeof selector ===“string”）{

			//（类型，选择器，fn）
			fn =数据;
			data = undefined;
		} else {

			//（类型，数据，fn）
			fn =数据;
			data = selector;
			selector = undefined;
		}
	}
	if（fn === false）{
		fn = returnFalse;
	} else if（！fn）{
		返回元素;
	}

	if（one === 1）{
		origFn = fn;
		fn = function（event）{

			//可以使用空集，因为事件包含信息
			jQuery（）。off（event）;
			return origFn.apply（this，arguments）;
		};

		//使用相同的guid，以便调用者可以使用origFn删除
		fn.guid = origFn.guid || （origFn.guid = jQuery.guid ++）;
	}
	return elem.each（function（）{
		jQuery.event.add（this，types，fn，data，selector）;
	}）;
}

/ *
 * Helper功能用于管理事件 - 不是公共接口的一部分。
 *为Dean Edwards的addEvent库提供了许多想法的道具。
 * /
jQuery.event = {

	全球：{}，

	add：function（elem，types，handler，data，selector）{
		var tmp，events，t，handleObjIn，
			special，eventHandle，handleObj，
			处理程序，类型，命名空间，origType，
			elemData = jQuery._data（elem）;

		//不要将事件附加到noData或text / comment节点（但允许普通对象）
		if（！elemData）{
			返回;
		}

		//调用者可以传入自定义数据的对象来代替处理程序
		if（handler.handler）{
			handleObjIn = handler;
			handler = handleObjIn.handler;
			selector = handleObjIn.selector;
		}

		//确保处理程序具有唯一ID，以后用于查找/删除它
		if（！handler.guid）{
			handler.guid = jQuery.guid ++;
		}

		//初始化元素的事件结构和主处理程序，如果这是第一个
		if（！（events = elemData.events））{
			events = elemData.events = {};
		}
		if（！（eventHandle = elemData.handle））{
			eventHandle = elemData.handle = function（e）{

				//丢弃jQuery.event.trigger（）和的第二个事件
				//在页面卸载后调用事件时
				返回jof类型！==“undefined”&&
					（！e || jQuery.event.triggered！== e.type）？
					jQuery.event.dispatch.apply（eventHandle.elem，arguments）：
					不确定的;
			};

			//添加elem作为句柄fn的属性以防止内存泄漏
			//使用IE非本机事件
			eventHandle.elem = elem;
		}

		//处理由空格分隔的多个事件
		types =（types ||“”）。match（rnotwhite）|| [“”];
		t = types.length;
		while（t--）{
			tmp = rtypenamespace.exec（types [t]）|| [];
			type = origType = tmp [1];
			namespaces =（tmp [2] ||“”）。split（“。”）。sort（）;

			//那里*必须*是一个类型，没有附加名称空间的处理程序
			if（！type）{
				继续;
			}

			//如果事件更改其类型，请使用特殊事件处理程序来更改类型
			special = jQuery.event.special [type] || {};

			//如果定义了选择器，则确定特殊事件api类型，否则给定类型
			type =（selector？special.delegateType：special.bindType）|| 类型;

			//根据新重置类型更新特殊
			special = jQuery.event.special [type] || {};

			// handleObj被传递给所有事件处理程序
			handleObj = jQuery.extend（{
				类型：类型，
				origType：origType，
				数据：数据，
				handler：handler，
				guid：handler.guid，
				选择器：选择器，
				needsContext：selector && jQuery.expr.match.needsContext.test（selector），
				namespace：namespaces.join（“。”）
			}，handleObjIn）;

			//如果我们是第一个，请启动事件处理程序队列
			if（！（handlers = events [type]））{
				handlers = events [type] = [];
				handlers.delegateCount = 0;

				//如果特殊事件处理程序返回false，则仅使用addEventListener / attachEvent
				if（！special.setup ||
					special.setup.call（elem，data，namespaces，eventHandle）=== false）{

					//将全局事件处理程序绑定到元素
					if（elem.addEventListener）{
						elem.addEventListener（type，eventHandle，false）;

					} else if（elem.attachEvent）{
						elem.attachEvent（“on”+ type，eventHandle）;
					}
				}
			}

			if（special.add）{
				special.add.call（elem，handleObj）;

				if（！handleObj.handler.guid）{
					handleObj.handler.guid = handler.guid;
				}
			}

			//添加到元素的处理程序列表，在前面委托
			if（selector）{
				handlers.splice（handlers.delegateCount ++，0，handleObj）;
			} else {
				handlers.push（handleObj）;
			}

			//跟踪曾经使用过哪些事件，以进行事件优化
			jQuery.event.global [type] = true;
		}

		// Nullify elem以防止IE中的内存泄漏
		elem = null;
	}，

	//从元素中分离事件或事件集
	remove：function（elem，types，handler，selector，mappedTypes）{
		var j，handleObj，tmp，
			origCount，t，事件，
			特殊，处理程序，类型，
			名称空间，origType，
			elemData = jQuery.hasData（elem）&& jQuery._data（elem）;

		if（！elemData ||！（events = elemData.events））{
			返回;
		}

		//对于类型中的每个type.namespace一次; 类型可以省略
		types =（types ||“”）。match（rnotwhite）|| [“”];
		t = types.length;
		while（t--）{
			tmp = rtypenamespace.exec（types [t]）|| [];
			type = origType = tmp [1];
			namespaces =（tmp [2] ||“”）。split（“。”）。sort（）;

			//取消绑定元素的所有事件（在此命名空间上，如果提供）
			if（！type）{
				for（输入事件）{
					jQuery.event.remove（elem，type + types [t]，handler，selector，true）;
				}
				继续;
			}

			special = jQuery.event.special [type] || {};
			type =（selector？special.delegateType：special.bindType）|| 类型;
			处理程序=事件[类型] || [];
			tmp = tmp [2] &&
				new RegExp（“（^ | \\。）”+ namespaces.join（“\\。（？：。* \\。|）”）+“（\\。| $）”）;

			//删除匹配的事件
			origCount = j = handlers.length;
			while（j--）{
				handleObj = handlers [j];

				if（（mappedTypes || origType === handleObj.origType）&&
					（！handler || handler.guid === handleObj.guid）&&
					（！tmp || tmp.test（handleObj.namespace））&&
					（！selector || selector === handleObj.selector ||
						selector ===“**”&& handleObj.selector））{
					handlers.splice（j，1）;

					if（handleObj.selector）{
						handlers.delegateCount--;
					}
					if（special.remove）{
						special.remove.call（elem，handleObj）;
					}
				}
			}

			//删除通用事件处理程序，如果我们删除了某些内容并且不再存在处理程
			//（避免在删除特殊事件处理程序期间无限递归的可能性）
			if（origCount &&！handlers.length）{
				if（！special.teardown ||
					special.teardown.call（elem，namespaces，elemData.handle）=== false）{

					jQuery.removeEvent（elem，type，elemData.handle）;
				}

				删除事件[type];
			}
		}

		//如果不再使用expando，请将其删除
		if（jQuery.isEmptyObject（events））{
			删除elemData.handle;

			// removeData还会检查空白并清空expando（如果为空）
			//所以使用它而不是删除
			jQuery._removeData（elem，“events”）;
		}
	}，

	trigger：function（event，data，elem，onlyHandlers）{
		var handle，ontype，cur，
			bubbleType，special，tmp，i，
			eventPath = [elem || 文件]，
			type = hasOwn.call（event，“type”）？event.type：event，
			namespaces = hasOwn.call（event，“namespace”）？event.namespace.split（“。”）：[];

		cur = tmp = elem = elem || 文献;

		//不要在文本和注释节点上执行事件
		if（elem.nodeType === 3 || elem.nodeType === 8）{
			返回;
		}

		//聚焦/模糊变形到聚焦/聚焦; 确保我们现在不解雇它们
		if（rfocusMorph.test（type + jQuery.event.triggered））{
			返回;
		}

		if（type.indexOf（“。”）> -1）{

			//命名空间触发器; 创建一个regexp以匹配handle（）中的事件类型
			namespaces = type.split（“。”）;
			type = namespaces.shift（）;
			namespaces.sort（）;
		}
		ontype = type.indexOf（“：”）<0 &&“on”+ type;

		//调用者可以传入jQuery.Event对象，Object或只传递事件类型字符串
		event = event [jQuery.expando]？
			事件：
			new jQuery.Event（type，typeof event ===“object”&& event）;

		//触发位掩码：＆1表示本机处理程序; ＆2 for jQuery（总是如此）
		event.isTrigger = onlyHandlers？2：3;
		event.namespace = namespaces.join（“。”）;
		event.rnamespace = event.namespace？
			new RegExp（“（^ | \\。）”+ namespaces.join（“\\。（？：。* \\。|）”）+“（\\。| $）”）：
			空值;

		//清理事件以防重复使用
		event.result = undefined;
		if（！event.target）{
			event.target = elem;
		}

		//克隆任何传入的数据并在事件前添加，创建处理程序arg列表
		data = data == null？
			[事件]：
			jQuery.makeArray（data，[event]）;

		//允许特殊事件在线外绘制
		special = jQuery.event.special [type] || {};
		if（！onlyHandlers && special.trigger && special.trigger.apply（elem，data）=== false）{
			返回;
		}

		//根据W3C事件规范（＃9951）预先确定事件传播路径
		//冒泡到文件，然后到窗口; 注意全球所有者文档var（＃9724）
		if（！onlyHandlers &&！special.noBubble &&！jQuery.isWindow（elem））{

			bubbleType = special.delegateType || 类型;
			if（！rfocusMorph.test（bubbleType + type））{
				cur = cur.parentNode;
			}
			for（; cur; cur = cur.parentNode）{
				eventPath.push（cur）;
				tmp = cur;
			}

			//如果我们需要文档（例如，不是普通的obj或分离的DOM），只添加窗口
			if（tmp ===（elem.ownerDocument || document））{
				eventPath.push（tmp.defaultView || tmp.parentWindow || window）;
			}
		}

		//事件路径上的消防处理程序
		i = 0;
		while（（cur = eventPath [i ++]）&&！event.isPropagationStopped（））{

			event.type = i> 1？
				bubbleType：
				special.bindType || 类型;

			// jQuery处理程序
			handle =（jQuery._data（cur，“events”）|| {}）[event.type] &&
				jQuery._data（cur，“handle”）;

			if（handle）{
				handle.apply（cur，data）;
			}

			//原生处理程序
			handle = ontype && cur [ontype];
			if（handle && handle.apply && acceptData（cur））{
				event.result = handle.apply（cur，data）;
				if（event.result === false）{
					event.preventDefault（）;
				}
			}
		}
		event.type = type;

		//如果没有人阻止默认操作，请立即执行
		if（！onlyHandlers &&！event.isDefaultPrevented（））{

			如果（
				（！special._default ||
				 special._default.apply（eventPath.pop（），data）=== false
				）&& acceptData（elem）
			）{

				//使用与事件相同的名称在目标上调用本机DOM方法。
				//不能在此处使用.isFunction（）检查，因为IE6 / 7未通过该测试。
				//不要对窗口执行默认操作，这是全局变量的位置（＃6170）
				if（ontype && elem [type] &&！jQuery.isWindow（elem））{

					//当我们调用它的FOO（）方法时，不要重新触发onFOO事件
					tmp = elem [ontype];

					if（tmp）{
						elem [ontype] = null;
					}

					//防止重新触发同一事件，因为我们已经在上面冒了它
					jQuery.event.triggered = type;
					尝试{
						elem [type]（）;
					} catch（e）{

						// IE <9死于焦点/模糊到隐藏元素（＃1486，＃12518）
						//仅在winXP IE8本机上可重现，而在IE8模式下不是IE9
					}
					jQuery.event.triggered = undefined;

					if（tmp）{
						elem [ontype] = tmp;
					}
				}
			}
		}

		return event.result;
	}，

	dispatch：function（event）{

		//从本机事件对象创建一个可写的jQuery.Event
		event = jQuery.event.fix（event）;

		var i，j，ret，matched，handleObj，
			handlerQueue = []，
			args = slice.call（arguments），
			handlers =（jQuery._data（this，“events”）|| {}）[event.type] || []，
			special = jQuery.event.special [event.type] || {};

		//使用fix-ed jQuery.Event而不是（只读）本机事件
		args [0] =事件;
		event.delegateTarget = this;

		//为映射类型调用preDispatch挂钩，如果需要，让它保释
		if（special.preDispatch && special.preDispatch.call（this，event）=== false）{
			返回;
		}

		//确定处理程序
		handlerQueue = jQuery.event.handlers.call（this，event，handlers）;

		//先运行代理; 他们可能想停止在我们身下传播
		i = 0;
		while（（matched = handlerQueue [i ++]）&&！event.isPropagationStopped（））{
			event.currentTarget = matched.elem;

			j = 0;
			while（（handleObj = matched.handlers [j ++]）&&
				！event.isImmediatePropagationStopped（））{

				//触发事件必须1）没有命名空间，或2）有命名空间
				//一个子集或等于绑定事件中的子集（两者都没有命名空间）。
				if（！event.rnamespace || event.rnamespace.test（handleObj.namespace））{

					event.handleObj = handleObj;
					event.data = handleObj.data;

					ret =（（jQuery.event.special [handleObj.origType] || {}）。handlele ||
						handleObj.handler）.apply（matched.elem，args）;

					if（ret！== undefined）{
						if（（event.result = ret）=== false）{
							event.preventDefault（）;
							event.stopPropagation（）;
						}
					}
				}
			}
		}

		//为映射类型调用postDispatch挂钩
		if（special.postDispatch）{
			special.postDispatch.call（this，event）;
		}

		return event.result;
	}，

	处理程序：function（event，handlers）{
		var i，matches，sel，handleObj，
			handlerQueue = []，
			delegateCount = handlers.delegateCount，
			cur = event.target;

		//支持（至少）：Chrome，IE9
		//查找委托处理程序
		//黑洞SVG <use>实例树（＃13180）
		//
		//支持：Firefox <= 42 +
		//避免在FF中非左键单击但不阻止IE无线电事件（＃3861，gh-2343）
		if（delegateCount && cur.nodeType &&
			（event.type！==“click”|| isNaN（event.button）|| event.button <1））{

			/ * jshint eqeqeq：false * /
			for（; cur！= this; cur = cur.parentNode || this）{
				/ * jshint eqeqeq：true * /

				//不要检查非元素（＃13208）
				//不要处理已禁用元素的点击次数（＃6911，＃8165，＃11382，＃11764）
				if（cur.nodeType === 1 &&（cur.disabled！== true || event.type！==“click”））{
					matches = [];
					for（i = 0; i <delegateCount; i ++）{
						handleObj = handlers [i];

						//不要与Object.prototype属性冲突（＃13203）
						sel = handleObj.selector +“”;

						if（匹配[sel] === undefined）{
							匹配[sel] = handleObj.needsContext？
								jQuery（sel，this）.index（cur）> -1：
								jQuery.find（sel，this，null，[cur]）。length;
						}
						if（匹配[sel]）{
							matches.push（handleObj）;
						}
					}
					if（matches.length）{
						handlerQueue.push（{elem：cur，handlers：matches}）;
					}
				}
			}
		}

		//添加剩余的（直接绑定的）处理程序
		if（delegateCount <handlers.length）{
			handlerQueue.push（{elem：this，handlers：handlers.slice（delegateCount）}）;
		}

		return handlerQueue;
	}，

	修复：function（event）{
		if（event [jQuery.expando]）{
			回归事件;
		}

		//创建事件对象的可写副本并规范化某些属性
		var i，prop，copy，
			type = event.type，
			originalEvent = event，
			fixHook = this.fixHooks [type];

		if（！fixHook）{
			this.fixHooks [type] = fixHook =
				rmouseEvent.test（类型）？this.mouseHooks：
				rkeyEvent.test（类型）？this.keyHooks：
				{};
		}
		copy = fixHook.props？this.props.concat（fixHook.props）：this.props;

		event = new jQuery.Event（originalEvent）;

		i = copy.length;
		当我 -  ） {
			prop = copy [i];
			event [prop] = originalEvent [prop];
		}

		//支持：IE <9
		//修复目标属性（＃1925）
		if（！event.target）{
			event.target = originalEvent.srcElement || 文献;
		}

		//支持：Safari 6-8 +
		//目标不应该是文本节点（＃504，＃13143）
		if（event.target.nodeType === 3）{
			event.target = event.target.parentNode;
		}

		//支持：IE <9
		//对于鼠标/键事件，metaKey == false，如果它未定义（＃3368，＃11328）
		event.metaKey = !! event.metaKey;

		return fixHook.filter？fixHook.filter（event，originalEvent）：event;
	}，

	//包含KeyEvent和MouseEvent共享的一些事件道具
	道具：（“altKey bubbles cancelable ctrlKey currentTarget detail eventPhase”+
		“metaKey relatedTarget shiftKey target timeStamp view”）。）。split（“”），

	fixHooks：{}，

	keyHooks：{
		道具：“char charCode key keyCode”.split（“”），
		filter：function（event，original）{

			//添加关键事件
			if（event.which == null）{
				event.which = original.charCode！= null？original.charCode：original.keyCode;
			}

			回归事件;
		}
	}，

	mouseHooks：{
		道具:(“按钮按钮clientX clientY fromElement offsetX offsetY”+
			“pageX pageY screenX screenY toElement”）。split（“”），
		filter：function（event，original）{
			var body，eventDoc，doc，
				button = original.button，
				fromElement = original.fromElement;

			//如果缺少并且clientX / Y可用，则计算pageX / Y.
			if（event.pageX == null && original.clientX！= null）{
				eventDoc = event.target.ownerDocument || 文献;
				doc = eventDoc.documentElement;
				body = eventDoc.body;

				event.pageX = original.clientX +
					（doc && doc.scrollLeft || body && body.scrollLeft || 0） - 
					（doc && doc.clientLeft || body && body.clientLeft || 0）;
				event.pageY = original.clientY +
					（doc && doc.scrollTop || body && body.scrollTop || 0） - 
					（doc && doc.clientTop || body && body.clientTop || 0）;
			}

			//如有必要，添加relatedTarget
			if（！event.relatedTarget && fromElement）{
				event.relatedTarget = fromElement === event.target？
					original.toElement：
					fromElement;
			}

			//添加点击：1 === left; 2 ===中; 3 ===对
			//注意：按钮未规范化，因此请勿使用它
			if（！event.which && button！== undefined）{
				event.which =（按钮＆1？1 :(按钮＆2？3 :(按钮＆4？2：0）））;
			}

			回归事件;
		}
	}，

	特别：{
		load：{

			//阻止触发的image.load事件从冒泡到window.load
			noBubble：是的
		}，
		焦点：{

			//如果可能，请激活原生事件，以使模糊/焦点顺序正确
			trigger：function（）{
				if（this！== safeActiveElement（）&& this.focus）{
					尝试{
						this.focus（）;
						返回false;
					} catch（e）{

						//支持：IE <9
						//如果我们将焦点错误地隐藏到隐藏元素（＃1486，＃12518），
						//让.trigger（）运行处理程序
					}
				}
			}，
			delegateType：“focusin”
		}，
		模糊：{
			trigger：function（）{
				if（this === safeActiveElement（）&& this.blur）{
					this.blur（）;
					返回false;
				}
			}，
			delegateType：“focusout”
		}，
		点击：{

			//对于复选框，触发本机事件，以便检查状态是正确的
			trigger：function（）{
				if（jQuery.nodeName（this，“input”）&& this.type ===“checkbox”&& this.click）{
					this.click（）;
					返回false;
				}
			}，

			//对于跨浏览器的一致性，请不要在链接上触发本机.click（）
			_default：function（event）{
				return jQuery.nodeName（event.target，“a”）;
			}
		}，

		beforeunload：{
			postDispatch：function（event）{

				//支持：Firefox 20+
				//如果未设置returnValue字段，Firefox不会发出警报。
				if（event.result！== undefined && event.originalEvent）{
					event.originalEvent.returnValue = event.result;
				}
			}
		}
	}，

	//在捐赠者事件上背驮式来模拟不同的事件
	模拟：function（type，elem，event）{
		var e = jQuery.extend（
			新的jQuery.Event（），
			事件，
			{
				类型：类型，
				isSimulated：是的

				//以前，`originalEvent：{}`设置在这里，所以stopPropagation调用
				//不会在捐赠者事件中触发，因为在我们自己的事件中
				// jQuery.event.stopPropagation函数我们检查了是否存在
				// originalEvent.stopPropagation方法，因此，它将是一个noop。
				//
				//将模拟事件的Guard移至jQuery.event.stopPropagation函数
				//因为`originalEvent`应该指向原始事件
				//与其他事件的持久性和更集中的逻辑
			}
		）;

		jQuery.event.trigger（e，null，elem）;

		if（e.isDefaultPrevented（））{
			event.preventDefault（）;
		}
	}
};

jQuery.removeEvent = document.removeEventListener？
	function（elem，type，handle）{

		//普通对象需要这个“if”
		if（elem.removeEventListener）{
			elem.removeEventListener（type，handle）;
		}
	}：
	function（elem，type，handle）{
		var name =“on”+ type;

		if（elem.detachEvent）{

			//＃8545，＃7054，防止IE6-8中自定义事件的内存泄漏
			//通过该事件的名称，在元素上分离所需的属性，
			//正确地将其暴露给GC
			if（typeof elem [name] ===“undefined”）{
				elem [name] = null;
			}

			elem.detachEvent（name，handle）;
		}
	};

jQuery.Event = function（src，props）{

	//允许没有'new'关键字的实例化
	if（！（此实例为jQuery.Event））{
		返回新的jQuery.Event（src，props）;
	}

	//事件对象
	if（src && src.type）{
		this.originalEvent = src;
		this.type = src.type;

		//冒泡文档的事件可能已标记为已阻止
		//由树下面的处理程序组成; 反映正确的价值。
		this.isDefaultPrevented = src.defaultPrevented ||
				src.defaultPrevented === undefined &&

				//支持：IE <9，Android <4.0
				src.returnValue === false？
			returnTrue：
			returnFalse;

	// 事件类型
	} else {
		this.type = src;
	}

	//将显式提供的属性放到事件对象上
	if（道具）{
		jQuery.extend（this，props）;
	}

	//如果传入的事件没有时间戳，请创建一个时间戳
	this.timeStamp = src && src.timeStamp || jQuery.now（）;

	//将其标记为已修复
	这[jQuery.expando] = true;
};

// jQuery.Event基于ECMAScript语言绑定指定的DOM3事件
// http://www.w3.org/TR/2003/WD-DOM-Level-3-Events-20030331/ecma-script-binding.html
jQuery.Event.prototype = {
	构造函数：jQuery.Event，
	isDefaultPrevented：returnFalse，
	isPropagationStopped：returnFalse，
	isImmediatePropagationStopped：returnFalse，

	preventDefault：function（）{
		var e = this.originalEvent;

		this.isDefaultPrevented = returnTrue;
		if（！e）{
			返回;
		}

		//如果存在preventDefault，请在原始事件上运行它
		if（e.preventDefault）{
			e.preventDefault（）;

		//支持：IE
		//否则将原始事件的returnValue属性设置为false
		} else {
			e.returnValue = false;
		}
	}，
	stopPropagation：function（）{
		var e = this.originalEvent;

		this.isPropagationStopped = returnTrue;

		if（！e || this.isSimulated）{
			返回;
		}

		//如果存在stopPropagation，请在原始事件上运行它
		if（e.stopPropagation）{
			e.stopPropagation（）;
		}

		//支持：IE
		//将原始事件的cancelBubble属性设置为true
		e.cancelBubble = true;
	}，
	stopImmediatePropagation：function（）{
		var e = this.originalEvent;

		this.isImmediatePropagationStopped = returnTrue;

		if（e && e.stopImmediatePropagation）{
			e.stopImmediatePropagation（）;
		}

		this.stopPropagation（）;
	}
};

//使用鼠标悬停/退出和事件时间检查创建鼠标中心/离开事件
//以便事件委托在jQuery中工作。
//对pointerenter / pointerleave和pointerover / pointerout执行相同操作
//
//支持：仅限Safari 7
// Safari经常发送mouseenter; 看到：
// https://code.google.com/p/chromium/issues/detail?id=470258
//用于描述错误（它也存在于较旧的Chrome版本中）。
jQuery.each（{
	mouseenter：“mouseover”，
	mouseleave：“mouseout”，
	pointerenter：“指针”，
	pointerleave：“指针”
}，function（orig，fix）{
	jQuery.event.special [orig] = {
		delegateType：修复，
		bindType：fix，

		handle：function（event）{
			var ret，
				target = this，
				related = event.relatedTarget，
				handleObj = event.handleObj;

			//对于mouseenter / leave调用处理程序（如果相关）在目标之外。
			//注意：如果鼠标离开/进入浏览器窗口，则无相关目标
			if（！related ||（related！== target &&！jQuery.contains（target，related）））{
				event.type = handleObj.origType;
				ret = handleObj.handler.apply（this，arguments）;
				event.type = fix;
			}
			返回;
		}
	};
}）;

// IE提交委托
if（！support.submit）{

	jQuery.event.special.submit = {
		setup：function（）{

			//只需要委托表单提交事件
			if（jQuery.nodeName（this，“form”））{
				返回false;
			}

			//当可能提交后代表单时，延迟添加提交处理程序
			jQuery.event.add（this，“click._submit keypress._submit”，function（e）{

				//节点名称检查可以避免IE中与VML相关的崩溃（＃9807）
				var elem = e.target，
					form = jQuery.nodeName（elem，“input”）|| jQuery.nodeName（elem，“button”）？

						//支持：IE <= 8
						//我们使用jQuery.prop而不是elem.form
						//允许修复IE8委托提交问题（gh-2332）
						//第三方polyfills / workarounds。
						jQuery.prop（elem，“form”）：
						不确定的;

				if（form &&！jQuery._data（form，“submit”））{
					jQuery.event.add（form，“submit._submit”，function（event）{
						event._submitBubble = true;
					}）;
					jQuery._data（form，“submit”，true）;
				}
			}）;

			//返回undefined，因为我们不需要事件监听器
		}，

		postDispatch：function（event）{

			//如果用户提交了表单，请在树中向上冒泡
			if（event._submitBubble）{
				delete event._submitBubble;
				if（this.parentNode &&！event.isTrigger）{
					jQuery.event.simulate（“submit”，this.parentNode，event）;
				}
			}
		}，

		拆解：function（）{

			//只需要委托表单提交事件
			if（jQuery.nodeName（this，“form”））{
				返回false;
			}

			//删除委托处理程序; cleanData最终会收到上面提到的提交处理程序
			jQuery.event.remove（this，“。_ submit”）;
		}
	};
}

// IE更改委派和复选框/无线电修复
if（！support.change）{

	jQuery.event.special.change = {

		setup：function（）{

			if（rformElems.test（this.nodeName））{

				// IE不会在支票/收音机上发生变化直到模糊; 点击即可触发它
				//在财产转换之后。吃special.change.handle中的模糊变化。
				//这仍然会在模糊后第二次触发检查/收音机。
				if（this.type ===“checkbox”|| this.type ===“radio”）{
					jQuery.event.add（this，“propertychange._change”，function（event）{
						if（event.originalEvent.propertyName ===“checked”）{
							this._justChanged = true;
						}
					}）;
					jQuery.event.add（this，“click._change”，function（event）{
						if（this._justChanged &&！event.isTrigger）{
							this._justChanged = false;
						}

						//允许触发的模拟更改事件（＃11500）
						jQuery.event.simulate（“change”，this，event）;
					}）;
				}
				返回false;
			}

			//委托事件; 懒惰 - 在后代输入上添加更改处理程序
			jQuery.event.add（this，“beforeactivate._change”，function（e）{
				var elem = e.target;

				if（rformElems.test（elem.nodeName）&&！jQuery._data（elem，“change”））{
					jQuery.event.add（elem，“change._change”，function（event）{
						if（this.parentNode &&！event.isSimulated &&！event.isTrigger）{
							jQuery.event.simulate（“change”，this.parentNode，event）;
						}
					}）;
					jQuery._data（elem，“change”，true）;
				}
			}）;
		}，

		handle：function（event）{
			var elem = event.target;

			//从复选框/收音机中吞下原生更改事件，我们已在上面触发它们
			if（this！== elem || event.isSimulated || event.isTrigger ||
				（elem.type！==“radio”&& elem.type！==“checkbox”））{

				return event.handleObj.handler.apply（this，arguments）;
			}
		}，

		拆解：function（）{
			jQuery.event.remove（this，“._ change”）;

			return！rformElems.test（this.nodeName）;
		}
	};
}

//支持：Firefox
// Firefox没有焦点（in | out）事件
//相关票证 -  https://bugzilla.mozilla.org/show_bug.cgi?id=687787
//
//支持：Chrome，Safari
//焦点和模糊事件后焦点（输入|输出）事件触发，
//这是规范违规 -  http://www.w3.org/TR/DOM-Level-3-Events/#events-focusevent-event-order
//相关票证 -  https://code.google.com/p/chromium/issues/detail?id=449857
if（！support.focusin）{
	jQuery.each（{focus：“focusin”，blur：“focusout”}，function（orig，fix）{

		//在文档上附加一个捕获处理程序，而有人想要聚焦/聚焦
		var handler = function（event）{
			jQuery.event.simulate（fix，event.target，jQuery.event.fix（event））;
		};

		jQuery.event.special [fix] = {
			setup：function（）{
				var doc = this.ownerDocument || 这个，
					attaches = jQuery._data（doc，fix）;

				if（！attaches）{
					doc.addEventListener（orig，handler，true）;
				}
				jQuery._data（doc，fix，（attaches || 0）+ 1）;
			}，
			拆解：function（）{
				var doc = this.ownerDocument || 这个，
					attaches = jQuery._data（doc，fix） -  1;

				if（！attaches）{
					doc.removeEventListener（orig，handler，true）;
					jQuery._removeData（doc，fix）;
				} else {
					jQuery._data（doc，fix，attaches）;
				}
			}
		};
	}）;
}

jQuery.fn.extend（{

	on：function（types，selector，data，fn）{
		返回（this，types，selector，data，fn）;
	}，
	一：函数（类型，选择器，数据，fn）{
		return on（this，types，selector，data，fn，1）;
	}，
	off：function（types，selector，fn）{
		var handleObj，type;
		if（types && types.preventDefault && types.handleObj）{

			//（event）调度jQuery.Event
			handleObj = types.handleObj;
			jQuery（types.delegateTarget）.off（
				handleObj.namespace？
					handleObj.origType +“。” + handleObj.namespace：
					handleObj.origType，
				handleObj.selector，
				handleObj.handler
			）;
			归还这个;
		}
		if（typeof types ===“object”）{

			//（types-object [，selector]）
			for（type in types）{
				this.off（type，selector，types [type]）;
			}
			归还这个;
		}
		if（selector === false || typeof selector ===“function”）{

			//（类型[，fn]）
			fn =选择器;
			selector = undefined;
		}
		if（fn === false）{
			fn = returnFalse;
		}
		return this.each（function（）{
			jQuery.event.remove（this，types，fn，selector）;
		}）;
	}，

	trigger：function（type，data）{
		return this.each（function（）{
			jQuery.event.trigger（type，data，this）;
		}）;
	}，
	triggerHandler：function（type，data）{
		var elem = this [0];
		if（elem）{
			return jQuery.event.trigger（type，data，elem，true）;
		}
	}
}）;


var rinlinejQuery = / jQuery \ d + =“（？：null | \ d +）”/ g，
	rnoshimcache = new RegExp（“<（？：”+ nodeNames +“）[\\ s />]”，“i”），
	rxhtmlTag = / <（？！area | br | col | embed | hr | img | input | link | meta | param）（（[\ w： - ] +）[^>] *）\ /> / gi，

	//支持：IE 10-11，Edge 10240+
	//在IE / Edge中使用正则表达式组会导致严重的减速。
	//请参阅https://connect.microsoft.com/IE/feedback/details/1736512/
	rnoInnerhtml = / <script | <style | <link / i，

	// checked =“选中”或选中
	rchecked = /checked\s*(?:[^=]|=\s*.checked.)/i,
	rscriptTypeMasked = /^true \ /(.*)/,
	rcleanScript = / ^ \ s * <！（？：\ [CDATA \ [|  - ）|（？：\] \] |  - ）> \ s * $ / g，
	safeFragment = createSafeFragment（document），
	fragmentDiv = safeFragment.appendChild（document.createElement（“div”））;

//支持：IE <8
//操作表需要一个tbody
function manipulationTarget（elem，content）{
	return jQuery.nodeName（elem，“table”）&&
		jQuery.nodeName（content.nodeType！== 11？content：content.firstChild，“tr”）？

		elem.getElementsByTagName（“tbody”）[0] ||
			elem.appendChild（elem.ownerDocument.createElement（“tbody”））：
		ELEM;
}

//替换/恢复脚本元素的type属性以进行安全的DOM操作
function disableScript（elem）{
	elem.type =（jQuery.find.attr（elem，“type”）！== null）+“/”+ elem.type;
	返回元素;
}
function restoreScript（elem）{
	var match = rscriptTypeMasked.exec（elem.type）;
	if（match）{
		elem.type = match [1];
	} else {
		elem.removeAttribute（“type”）;
	}
	返回元素;
}

function cloneCopyEvent（src，dest）{
	if（dest.nodeType！== 1 ||！jQuery.hasData（src））{
		返回;
	}

	var type，i，l，
		oldData = jQuery._data（src），
		curData = jQuery._data（dest，oldData），
		events = oldData.events;

	if（events）{
		删除curData.handle;
		curData.events = {};

		for（输入事件）{
			for（i = 0，l = events [type] .length; i <l; i ++）{
				jQuery.event.add（dest，type，events [type] [i]）;
			}
		}
	}

	//使克隆的公共数据对象成为原始数据的副本
	if（curData.data）{
		curData.data = jQuery.extend（{}，curData.data）;
	}
}

function fixCloneNodeIssues（src，dest）{
	var nodeName，e，data;

	//我们不需要为非元素做任何事情
	if（dest.nodeType！== 1）{
		返回;
	}

	nodeName = dest.nodeName.toLowerCase（）;

	// IE6-8在使用cloneNode时复制通过attachEvent绑定的事件。
	if（！support.noCloneEvent && dest [jQuery.expando]）{
		data = jQuery._data（dest）;

		for（e in data.events）{
			jQuery.removeEvent（dest，e，data.handle）;
		}

		//如果还要复制expando，则会引用事件数据而不是复制事件数据
		dest.removeAttribute（jQuery.expando）;
	}

	// IE克隆脚本时会清空内容，并尝试评估新设置的文本
	if（nodeName ===“script”&& dest.text！== src.text）{
		disableScript（dest）.text = src.text;
		restoreScript（dest）;

	// IE6-10使用classid不正确地克隆了对象元素的子元素。
	//如果parent为null，则IE10抛出NoModificationAllowedError，＃12132。
	} else if（nodeName ===“object”）{
		if（dest.parentNode）{
			dest.outerHTML = src.outerHTML;
		}

		//这条路径对IE9来说是不可避免的。克隆对象时
		// IE9中的元素，上面的outerHTML策略是不够的。
		//如果src有innerHTML且目标没有，
		//将src.innerHTML复制到dest.innerHTML中。＃10324
		if（support.html5Clone &&（src.innerHTML &&！jQuery.trim（dest.innerHTML）））{
			dest.innerHTML = src.innerHTML;
		}

	} else if（nodeName ===“input”&& rcheckableType.test（src.type））{

		// IE6-8无法保持克隆复选框的已检查状态
		//或单选按钮 更糟糕的是，IE6-7无法提供克隆元素
		//如果未设置defaultChecked值，则检查外观

		dest.defaultChecked = dest.checked = src.checked;

		// IE6-7混淆并最终设置克隆的值
		//复选框/单选按钮指向空字符串而不是“打开”
		if（dest.value！== src.value）{
			dest.value = src.value;
		}

	// IE6-8无法将所选选项返回到所选的默认选项
	//克隆选项时的状态
	} else if（nodeName ===“option”）{
		dest.defaultSelected = dest.selected = src.defaultSelected;

	// IE6-8无法将defaultValue设置为正确的值
	//克隆其他类型的输入字段
	} else if（nodeName ===“input”|| nodeName ===“textarea”）{
		dest.defaultValue = src.defaultValue;
	}
}

function domManip（collection，args，callback，ignored）{

	//展平任何嵌套数组
	args = concat.apply（[]，args）;

	var first，node，hasScripts，
		脚本，doc，片段，
		i = 0，
		l = collection.length，
		iNoClone = l  -  1，
		value = args [0]，
		isFunction = jQuery.isFunction（value）;

	//我们无法在WebKit中克隆包含checked的节点片段
	if（isFunction ||
			（l> 1 && typeof value ===“string”&&
				！support.checkClone && rchecked.test（value）））{
		return collection.each（function（index）{
			var self = collection.eq（index）;
			if（isFunction）{
				args [0] = value.call（this，index，self.html（））;
			}
			domManip（自我，args，回调，被忽略）;
		}）;
	}

	if（l）{
		fragment = buildFragment（args，collection [0] .ownerDocument，false，collection，ignored）;
		first = fragment.firstChild;

		if（fragment.childNodes.length === 1）{
			fragment = first;
		}

		//需要新内容或对被忽略元素感兴趣才能调用回调
		if（first || ignored）{
			scripts = jQuery.map（getAll（fragment，“script”），disableScript）;
			hasScripts = scripts.length;

			//将原始片段用于最后一项
			//而不是第一个，因为它可以结束
			//在某些情况下被错误地清空（＃8070）。
			for（; i <l; i ++）{
				node = fragment;

				if（i！== iNoClone）{
					node = jQuery.clone（node，true，true）;

					//保留对克隆脚本的引用，以便以后恢复
					if（hasScripts）{

						//支持：Android <4.1，PhantomJS <2
						// push.apply（_，arraylike）抛出古老的WebKit
						jQuery.merge（scripts，getAll（node，“script”））;
					}
				}

				callback.call（collection [i]，node，i）;
			}

			if（hasScripts）{
				doc = scripts [scripts.length  -  1] .ownerDocument;

				//重新启用脚本
				jQuery.map（scripts，restoreScript）;

				//在第一次文档插入时评估可执行脚本
				for（i = 0; i <hasScripts; i ++）{
					node = scripts [i];
					if（rscriptType.test（node.type ||“”）&&
						！jQuery._data（node，“globalEval”）&&
						jQuery.contains（doc，node））{

						if（node.src）{

							//可选的AJAX依赖项，但如果不存在则不会运行脚本
							if（jQuery._evalUrl）{
								jQuery._evalUrl（node.src）;
							}
						} else {
							jQuery.globalEval（
								（node.text || node.textContent || node.innerHTML ||“”）
									.replace（rcleanScript，“”）
							）;
						}
					}
				}
			}

			//修复＃11809：避免泄漏内存
			fragment = first = null;
		}
	}

	回收;
}

function remove（elem，selector，keepData）{
	var节点，
		elems =选择器？jQuery.filter（selector，elem）：elem，
		i = 0;

	for（;（node = elems [i]）！= null; i ++）{

		if（！keepData && node.nodeType === 1）{
			jQuery.cleanData（getAll（node））;
		}

		if（node.parentNode）{
			if（keepData && jQuery.contains（node.ownerDocument，node））{
				setGlobalEval（getAll（node，“script”））;
			}
			node.parentNode.removeChild（node）;
		}
	}

	返回元素;
}

jQuery.extend（{
	htmlPrefilter：function（html）{
		return html.replace（rxhtmlTag，“<$ 1> </ $ 2>”）;
	}，

	clone：function（elem，dataAndEvents，deepDataAndEvents）{
		var destElements，node，clone，i，srcElements，
			inPage = jQuery.contains（elem.ownerDocument，elem）;

		if（support.html5Clone || jQuery.isXMLDoc（elem）||
			！rnoshimcache.test（“<”+ elem.nodeName +“>”））{

			clone = elem.cloneNode（true）;

		// IE <= 8无法正确克隆已分离的未知元素节点
		} else {
			fragmentDiv.innerHTML = elem.outerHTML;
			fragmentDiv.removeChild（clone = fragmentDiv.firstChild）;
		}

		if（（！support.noCloneEvent ||！support.noCloneChecked）&&
				（elem.nodeType === 1 || elem.nodeType === 11）&&！jQuery.isXMLDoc（elem））{

			//我们出于性能原因避开了Sizzle：http：//jsperf.com/getall-vs-sizzle/2
			destElements = getAll（clone）;
			srcElements = getAll（elem）;

			//修复所有IE克隆问题
			for（i = 0;（node = srcElements [i]）！= null; ++ i）{

				//确保目标节点不为空; 修复＃9587
				if（destElements [i]）{
					fixCloneNodeIssues（node，destElements [i]）;
				}
			}
		}

		//将事件从原始复制到克隆
		if（dataAndEvents）{
			if（deepDataAndEvents）{
				srcElements = srcElements || getAll（elem）;
				destElements = destElements || getAll（clone）;

				for（i = 0;（node = srcElements [i]）！= null; i ++）{
					cloneCopyEvent（node，destElements [i]）;
				}
			} else {
				cloneCopyEvent（elem，clone）;
			}
		}

		//保留脚本评估历史记录
		destElements = getAll（clone，“script”）;
		if（destElements.length> 0）{
			setGlobalEval（destElements，！inPage && getAll（elem，“script”））;
		}

		destElements = srcElements = node = null;

		//返回克隆的集合
		返回克隆;
	}，

	cleanData：function（elems，/ * internal * / forceAcceptData）{
		var elem，type，id，data，
			i = 0，
			internalKey = jQuery.expando，
			cache = jQuery.cache，
			attributes = support.attributes，
			special = jQuery.event.special;

		for（;（elem = elems [i]）！= null; i ++）{
			if（forceAcceptData || acceptData（elem））{

				id = elem [internalKey];
				data = id && cache [id];

				if（data）{
					if（data.events）{
						for（输入data.events）{
							if（special [type]）{
								jQuery.event.remove（elem，type）;

							//这是避免jQuery.event.remove开销的快捷方式
							} else {
								jQuery.removeEvent（elem，type，data.handle）;
							}
						}
					}

					//只有在jQuery.event.remove尚未删除缓存时才删除缓存
					if（cache [id]）{

						delete cache [id];

						//支持：IE <9
						// IE不允许我们从节点中删除expando属性
						// IE与属性一起创建expando属性
						// IE在Document节点上没有removeAttribute函数
						if（！attributes && typeof elem.removeAttribute！==“undefined”）{
							elem.removeAttribute（internalKey）;

						//删除属性时Webkit和Blink性能会受到影响
						//来自DOM节点，因此设置为undefined
						// https://code.google.com/p/chromium/issues/detail?id=378607
						} else {
							elem [internalKey] =未定义;
						}

						deletedIds.push（id）;
					}
				}
			}
		}
	}
}）;

jQuery.fn.extend（{

	//让domManip暴露到3.0（gh-2225）
	domManip：domManip，

	detach：function（selector）{
		return remove（this，selector，true）;
	}，

	remove：function（selector）{
		return remove（this，selector）;
	}，

	text：function（value）{
		return access（this，function（value）{
			返回值=== undefined？
				jQuery.text（this）：
				this.empty（）。追加（
					（this [0] && this [0] .ownerDocument || document）.createTextNode（value）
				）;
		}，null，value，arguments.length）;
	}，

	append：function（）{
		return domManip（this，arguments，function（elem）{
			if（this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9）{
				var target = manipulationTarget（this，elem）;
				target.appendChild（elem）;
			}
		}）;
	}，

	prepend：function（）{
		return domManip（this，arguments，function（elem）{
			if（this.nodeType === 1 || this.nodeType === 11 || this.nodeType === 9）{
				var target = manipulationTarget（this，elem）;
				target.insertBefore（elem，target.firstChild）;
			}
		}）;
	}，

	之前：function（）{
		return domManip（this，arguments，function（elem）{
			if（this.parentNode）{
				this.parentNode.insertBefore（elem，this）;
			}
		}）;
	}，

	after：function（）{
		return domManip（this，arguments，function（elem）{
			if（this.parentNode）{
				this.parentNode.insertBefore（elem，this.nextSibling）;
			}
		}）;
	}，

	empty：function（）{
		var elem，
			i = 0;

		for（;（elem = this [i]）！= null; i ++）{

			//删除元素节点并防止内存泄漏
			if（elem.nodeType === 1）{
				jQuery.cleanData（getAll（elem，false））;
			}

			//删除所有剩余的节点
			while（elem.firstChild）{
				elem.removeChild（elem.firstChild）;
			}

			//如果这是一个选择，请确保它显示为空（＃12336）
			//支持：IE <9
			if（elem.options && jQuery.nodeName（elem，“select”））{
				elem.options.length = 0;
			}
		}

		归还这个;
	}，

	clone：function（dataAndEvents，deepDataAndEvents）{
		dataAndEvents = dataAndEvents == null？false：dataAndEvents;
		deepDataAndEvents = deepDataAndEvents == null？dataAndEvents：deepDataAndEvents;

		return this.map（function（）{
			return jQuery.clone（this，dataAndEvents，deepDataAndEvents）;
		}）;
	}，

	html：function（value）{
		return access（this，function（value）{
			var elem = this [0] || {}，
				i = 0，
				l = this.length;

			if（value === undefined）{
				return elem.nodeType === 1？
					elem.innerHTML.replace（rinlinejQuery，“”）：
					不确定的;
			}

			//看看我们是否可以使用快捷方式并使用innerHTML
			if（typeof value ===“string”&&！rnoInnerhtml.test（value）&&
				（support.htmlSerialize ||！rnoshimcache.test（value））&&
				（support.leadingWhitespace ||！rleadingWhitespace.test（value））&&
				！wrapMap [（rtagName.exec（value）|| [“”，“”]）[1] .toLowerCase（）]）{

				value = jQuery.htmlPrefilter（value）;

				尝试{
					for（; i <l; i ++）{

						//删除元素节点并防止内存泄漏
						elem = this [i] || {};
						if（elem.nodeType === 1）{
							jQuery.cleanData（getAll（elem，false））;
							elem.innerHTML = value;
						}
					}

					elem = 0;

				//如果使用innerHTML抛出异常，请使用fallback方法
				} catch（e）{}
			}

			if（elem）{
				this.empty（）。append（value）;
			}
		}，null，value，arguments.length）;
	}，

	replaceWith：function（）{
		var ignored = [];

		//进行更改，将每个未忽略的上下文元素替换为新内容
		return domManip（this，arguments，function（elem）{
			var parent = this.parentNode;

			if（jQuery.inArray（this，ignored）<0）{
				jQuery.cleanData（getAll（this））;
				if（parent）{
					parent.replaceChild（elem，this）;
				}
			}

		//强制回调调用
		}，被忽略）;
	}
}）;

jQuery.each（{
	appendTo：“追加”，
	prependTo：“prepend”，
	insertBefore：“before”，
	insertAfter：“after”，
	replaceAll：“replaceWith”
}，function（name，original）{
	jQuery.fn [name] = function（selector）{
		var elems，
			i = 0，
			ret = []，
			insert = jQuery（selector），
			last = insert.length  -  1;

		for（; i <= last; i ++）{
			elems = i ===最后？这个：this.clone（true）;
			jQuery（insert [i]）[original]（elems）;

			//现代浏览器可以将jQuery集合应用为数组，但oldIE需要.get（）
			push.apply（ret，elems.get（））;
		}

		return this.pushStack（ret）;
	};
}）;


var iframe，
	elemdisplay = {

		//支持：Firefox
		//我们必须为FF预先定义这些值（＃10227）
		HTML：“阻止”，
		身体：“阻止”
	};

/ **
 *检索元素的实际显示
 * @param {String} name该元素的nodeName
 * @param {Object} doc文档对象
 * /

//仅在defaultDisplay中调用
function actualDisplay（name，doc）{
	var elem = jQuery（doc.createElement（name））。appendTo（doc.body），

		display = jQuery.css（elem [0]，“display”）;

	//我们没有任何数据存储在元素上，
	//所以使用“detach”方法作为摆脱元素的快速方法
	elem.detach（）;

	返回显示;
}

/ **
 *尝试确定元素的默认显示值
 * @param {String} nodeName
 * /
function defaultDisplay（nodeName）{
	var doc = document，
		display = elemdisplay [nodeName];

	if（！display）{
		display = actualDisplay（nodeName，doc）;

		//如果简单方法失败，请从iframe内部读取
		if（display ===“none”||！display）{

			//如果可能，请使用已创建的iframe
			iframe =（iframe || jQuery（“<iframe frameborder ='0'width ='0'height ='0'/>”））
				.appendTo（doc.documentElement）;

			//始终编写一个新的HTML框架，以便Webkit和Firefox不会重复使用
			doc =（iframe [0] .contentWindow || iframe [0] .contentDocument）.document;

			//支持：IE
			doc.write（）;
			doc.close（）;

			display = actualDisplay（nodeName，doc）;
			iframe.detach（）;
		}

		//存储正确的默认显示
		elemdisplay [nodeName] = display;
	}

	返回显示;
}
var rmargin =（/ ^ margin /）;

var rnumnonpx = new RegExp（“^（”+ pnum +“）（?! px）[az％] + $”，“i”）;

var swap = function（elem，options，callback，args）{
	var ret，name，
		old = {};

	//记住旧值，然后插入新值
	for（选项中的名称）{
		old [name] = elem.style [name];
		elem.style [name] = options [name];
	}

	ret = callback.apply（elem，args || []）;

	//恢复旧值
	for（选项中的名称）{
		elem.style [name] = old [name];
	}

	返回;
};


var documentElement = document.documentElement;



（function（）{
	var pixelPositionVal，pixelMarginRightVal，boxSizingReliableVal，
		reliableHiddenOffsetsVal，reliableMarginRightVal，reliableMarginLeftVal，
		container = document.createElement（“div”），
		div = document.createElement（“div”）;

	//在有限（非浏览器）环境中尽早完成
	if（！div.style）{
		返回;
	}

	div.style.cssText =“float：left; opacity：.5”;

	//支持：IE <9
	//确保元素不透明度存在（与过滤器相反）
	support.opacity = div.style.opacity ===“0.5”;

	//验证样式浮点存在
	//（IE使用styleFloat而不是cssFloat）
	support.cssFloat = !! div.style.cssFloat;

	div.style.backgroundClip =“content-box”;
	div.cloneNode（true）.style.backgroundClip =“”;
	support.clearCloneStyle = div.style.backgroundClip ===“content-box”;

	container = document.createElement（“div”）;
	container.style.cssText =“border：0; width：8px; height：0; top：0; left：-9999px;” +
		“填充：0;边距：1px的;位置：绝对”;
	div.innerHTML =“”;
	container.appendChild（div）;

	//支持：Firefox <29，Android 2.3
	//供应商前缀框大小调整
	support.boxSizing = div.style.boxSizing ===“”|| div.style.MozBoxSizing ===“”||
		div.style.WebkitBoxSizing ===“”;

	jQuery.extend（support，{
		reliableHiddenOffsets：function（）{
			if（pixelPositionVal == null）{
				computeStyleTests（）;
			}
			return reliableHiddenOffsetsVal;
		}，

		boxSizingReliable：function（）{

			//我们在这里检查pixelPositionVal而不是boxSizingReliableVal
			//因为压缩得更好而且无论如何它们都是一起计算的。
			if（pixelPositionVal == null）{
				computeStyleTests（）;
			}
			return boxSizingReliableVal;
		}，

		pixelMarginRight：function（）{

			//支持：Android 4.0-4.3
			if（pixelPositionVal == null）{
				computeStyleTests（）;
			}
			return pixelMarginRightVal;
		}，

		pixelPosition：function（）{
			if（pixelPositionVal == null）{
				computeStyleTests（）;
			}
			return pixelPositionVal;
		}，

		reliableMarginRight：function（）{

			//支持：Android 2.3
			if（pixelPositionVal == null）{
				computeStyleTests（）;
			}
			return reliableMarginRightVal;
		}，

		reliableMarginLeft：function（）{

			//支持：IE <= 8，Android 4.0  - 仅限4.3，Firefox <= 3  -  37
			if（pixelPositionVal == null）{
				computeStyleTests（）;
			}
			return reliableMarginLeftVal;
		}
	}）;

	function computeStyleTests（）{
		var contents，divStyle，
			documentElement = document.documentElement;

		// 建立
		documentElement.appendChild（container）;

		div.style.cssText =

			//支持：Android 2.3
			//供应商前缀框大小调整
			“-webkit-盒大小：边界盒，盒大小：边界盒;” +
			“位置：相对;显示：块;” +
			“保证金：汽车;边界：1px的;填充：1px的;” +
			“顶部：1％;宽度：50％”;

		//支持：IE <9
		//在没有getComputedStyle的情况下假设合理的值
		pixelPositionVal = boxSizingReliableVal = reliableMarginLeftVal = false;
		pixelMarginRightVal = reliableMarginRightVal = true;

		//检查getComputedStyle，以便此代码不在IE <9中运行。
		if（window.getComputedStyle）{
			divStyle = window.getComputedStyle（div）;
			pixelPositionVal =（divStyle || {}）。top！==“1％”;
			reliableMarginLeftVal =（divStyle || {}）。marginLeft ===“2px”;
			boxSizingReliableVal =（divStyle || {width：“4px”}）。width ===“4px”;

			//支持：仅限Android 4.0  -  4.3
			//有些样式会返回百分比值，即使它们不应该
			div.style.marginRight =“50％”;
			pixelMarginRightVal =（divStyle || {marginRight：“4px”}）。marginRight ===“4px”;

			//支持：仅限Android 2.3
			// Div具有明确的宽度，没有右边的错误
			//根据容器宽度计算margin-right（＃3333）
			// WebKit Bug 13343  -  getComputedStyle为margin-right返回错误的值
			contents = div.appendChild（document.createElement（“div”））;

			//重置CSS：box-sizing; 显示; 余量; 边界; 填充
			contents.style.cssText = div.style.cssText =

				//支持：Android 2.3
				//供应商前缀框大小调整
				“-webkit-盒大小：内容箱; -moz-箱大小：内容箱;” +
				“箱式施胶：内容盒;显示：块;边缘：0;边界：0;填充：0”;
			contents.style.marginRight = contents.style.width =“0”;
			div.style.width =“1px”;

			reliableMarginRightVal =
				！parseFloat（（window.getComputedStyle（contents）|| {}）。marginRight）;

			div.removeChild（contents）;
		}

		//支持：IE6-8
		//首先检查getClientRects是否按预期工作
		//检查表格单元格在设置时是否仍具有offsetWidth / Height
		//显示：无，并且还有其他可见的表格单元格
		//表格行; 如果是这样，offsetWidth / Height在使用时不可靠
		//确定是否已直接使用隐藏元素
		// display：none（如果父元素是，则使用偏移量仍然是安全的
		//隐藏 戴安全护目镜并查看bug＃4512了解更多信息）。
		div.style.display =“none”;
		reliableHiddenOffsetsVal = div.getClientRects（）。length === 0;
		if（reliableHiddenOffsetsVal）{
			div.style.display =“”;
			div.innerHTML =“<table> <tr> <td> </ td> <td> t </ td> </ tr> </ table>”;
			div.childNodes [0] .style.borderCollapse =“separate”;
			contents = div.getElementsByTagName（“td”）;
			contents [0] .style.cssText =“margin：0; border：0; padding：0; display：none”;
			reliableHiddenOffsetsVal = contents [0] .offsetHeight === 0;
			if（reliableHiddenOffsetsVal）{
				contents [0] .style.display =“”;
				contents [1] .style.display =“none”;
				reliableHiddenOffsetsVal = contents [0] .offsetHeight === 0;
			}
		}

		// 拆除
		documentElement.removeChild（container）;
	}

}）（）;


var getStyles，curCSS，
	rposition = / ^（top | right | bottom | left）$ /;

if（window.getComputedStyle）{
	getStyles = function（elem）{

		//支持：IE <= 11 +，Firefox <= 30 +（＃15098，＃14150）
		// IE会抛出弹出窗口中创建的元素
		// FF同时通过“defaultView.getComputedStyle”抛出框架元素
		var view = elem.ownerDocument.defaultView;

		if（！view ||！view.opener）{
			view = window;
		}

		return view.getComputedStyle（elem）;
	};

	curCSS = function（elem，name，calculated）{
		var width，minWidth，maxWidth，ret，
			style = elem.style;

		computed = computed || getStyles（elem）;

		//只有IE9中的.css（'filter'）才需要getPropertyValue，参见＃12537
		ret =计算？computed.getPropertyValue（name）|| computed [name]：undefined;

		//支持：仅限Opera 12.1x
		//即使没有计算，也会回归风格
		//对于文档片段上的elems，未定义compute
		if（（ret ===“”|| ret === undefined）&&！jQuery.contains（elem.ownerDocument，elem））{
			ret = jQuery.style（elem，name）;
		}

		if（computed）{

			//致敬Dean Edwards“令人敬畏的黑客”
			// Chrome <17和Safari 5.0使用“计算值”
			//而不是“使用价值”作为保证金权利
			// Safari 5.1.7（至少）返回一组较大值的百分比，
			//但宽度似乎是可靠的像素
			//这是针对CSSOM草案规范的：
			// http://dev.w3.org/csswg/cssom/#resolved-values
			if（！support.pixelMarginRight（）&& rnumnonpx.test（ret）&& rmargin.test（name））{

				//记住原始值
				width = style.width;
				minWidth = style.minWidth;
				maxWidth = style.maxWidth;

				//输入新值以获取计算值
				style.minWidth = style.maxWidth = style.width = ret;
				ret = computed.width;

				//恢复更改的值
				style.width = width;
				style.minWidth = minWidth;
				style.maxWidth = maxWidth;
			}
		}

		//支持：IE
		// IE将zIndex值作为整数返回。
		return ret === undefined？
			ret：
			ret +“”;
	};
} else if（documentElement.currentStyle）{
	getStyles = function（elem）{
		return elem.currentStyle;
	};

	curCSS = function（elem，name，calculated）{
		var left，rs，rsLeft，ret，
			style = elem.style;

		computed = computed || getStyles（elem）;
		ret =计算？computed [name]：undefined;

		//避免在此处将ret设置为空字符串
		//所以我们不默认为auto
		if（ret == null && style && style [name]）{
			ret = style [name];
		}

		//来自Dean Edwards的精彩黑客
		// http://erik.eae.net/archives/2007/07/27/18.54.15/#comment-102291

		//如果我们不处理常规像素数
		//但是数字有一个奇怪的结尾，我们需要将它转换为像素
		//但不是位置css属性，因为它们是
		//改为与父元素成比例
		//而我们无法衡量父母，因为它
		//可能会触发“堆叠玩偶”问题
		if（rnumnonpx.test（ret）&&！rposition.test（name））{

			//记住原始值
			left = style.left;
			rs = elem.runtimeStyle;
			rsLeft = rs && rs.left;

			//输入新值以获取计算值
			if（rsLeft）{
				rs.left = elem.currentStyle.left;
			}
			style.left = name ===“fontSize”？“1em”：ret;
			ret = style.pixelLeft +“px”;

			//恢复更改的值
			style.left = left;
			if（rsLeft）{
				rs.left = rsLeft;
			}
		}

		//支持：IE
		// IE将zIndex值作为整数返回。
		return ret === undefined？
			ret：
			ret +“”|| “汽车”;
	};
}




function addGetHookIf（conditionFn，hookFn）{

	//定义钩子，我们将在第一次运行时检查它是否真的需要。
	返回{
		get：function（）{
			if（conditionFn（））{

				//不需要钩子（或者因为它不可能使用它
				//缺少依赖项），删除它。
				删除this.get;
				返回;
			}

			//需要钩子; 重新定义它以便不再执行支持测试。
			return（this.get = hookFn）.apply（this，arguments）;
		}
	};
}


VAR

		ralpha = / alpha \（[^]] * \）/ i，
	ropacity = / opacity \ s * = \ s *（[^]] *）/ i，

	//如果display is none或者以table开头，则可以交换
	//“table”，“table-cell”或“table-caption”
	//在这里查看显示值：
	// https://developer.mozilla.org/en-US/docs/CSS/display
	rdisplayswap = /^(none|table(?!-c[ea]).+)/,
	rnumsplit = new RegExp（“^（”+ pnum +“）（。*）$”，“i”），

	cssShow = {position：“absolute”，visibility：“hidden”，display：“block”}，
	cssNormalTransform = {
		letterSpacing：“0”，
		fontWeight：“400”
	}，

	cssPrefixes = [“Webkit”，“O”，“Moz”，“ms”]，
	emptyStyle = document.createElement（“div”）。style;


//返回映射到潜在供应商前缀属性的css属性
function vendorPropName（name）{

	//非供应商前缀的名称的快捷方式
	if（name in emptyStyle）{
		返回名称;
	}

	//检查供应商的前缀名称
	var capName = name.charAt（0）.toUpperCase（）+ name.slice（1），
		i = cssPrefixes.length;

	当我 -  ） {
		name = cssPrefixes [i] + capName;
		if（name in emptyStyle）{
			返回名称;
		}
	}
}

function showHide（elements，show）{
	var display，elem，hidden，
		values = []，
		index = 0，
		length = elements.length;

	for（; index <length; index ++）{
		elem = elements [index];
		if（！elem.style）{
			继续;
		}

		values [index] = jQuery._data（elem，“olddisplay”）;
		display = elem.style.display;
		if（show）{

			//重置此元素的内联显示以了解它是否存在
			//被级联规则隐藏或不隐藏
			if（！values [index] && display ===“none”）{
				elem.style.display =“”;
			}

			//使用display：none设置已覆盖的元素
			//在样式表中，无论默认的浏览器样式是什么
			//对于这样的元素
			if（elem.style.display ===“”&& isHidden（elem））{
				值[index] =
					jQuery._data（elem，“olddisplay”，defaultDisplay（elem.nodeName））;
			}
		} else {
			hidden = isHidden（elem）;

			if（display && display！==“none”||！hidden）{
				jQuery._data（
					ELEM，
					“olddisplay”
					隐藏？display：jQuery.css（elem，“display”）
				）;
			}
		}
	}

	//在第二个循环中设置大多数元素的显示
	//避免不断的回流
	for（index = 0; index <length; index ++）{
		elem = elements [index];
		if（！elem.style）{
			继续;
		}
		if（！show || elem.style.display ===“none”|| elem.style.display ===“”）{
			elem.style.display = show？值[index] || ““ ： “没有”;
		}
	}

	返回元素;
}

function setPositiveNumber（elem，value，subtract）{
	var matches = rnumsplit.exec（value）;
	回归比赛？

		//防止未定义的“减去”，例如，当用在cssHooks中时
		Math.max（0，匹配[1]  - （减去|| 0））+（匹配[2] ||“px”）：
		值;
}

function augmentWidthOrHeight（elem，name，extra，isBorderBox，styles）{
	var i = extra ===（isBorderBox？“border”：“content”）？

		//如果我们已经有了正确的测量，请避免增加
		4：

		//否则初始化水平或垂直属性
		name ===“width”？1：0，

		val = 0;

	for（; i <4; i + = 2）{

		//两个盒子模型都不包括边距，所以如果我们需要它就添加它
		if（extra ===“margin”）{
			val + = jQuery.css（elem，extra + cssExpand [i]，true，styles）;
		}

		if（isBorderBox）{

			// border-box包含填充，如果我们想要内容，请将其删除
			if（extra ===“content”）{
				val  -  = jQuery.css（elem，“padding”+ cssExpand [i]，true，styles）;
			}

			//此时，额外不是边框也不是边距，因此请删除边框
			if（extra！==“margin”）{
				val  -  = jQuery.css（elem，“border”+ cssExpand [i] +“Width”，true，styles）;
			}
		} else {

			//此时，extra不是内容，因此添加填充
			val + = jQuery.css（elem，“padding”+ cssExpand [i]，true，styles）;

			//此时，extra不是content也不是padding，所以添加border
			if（extra！==“padding”）{
				val + = jQuery.css（elem，“border”+ cssExpand [i] +“Width”，true，styles）;
			}
		}
	}

	返回;
}

function getWidthOrHeight（elem，name，extra）{

	//以offset属性开头，它相当于border-box值
	var valueIsBorderBox = true，
		val = name ===“width”？elem.offsetWidth：elem.offsetHeight，
		styles = getStyles（elem），
		isBorderBox = support.boxSizing &&
			jQuery.css（elem，“boxSizing”，false，styles）===“border-box”;

	//一些非html元素为offsetWidth返回undefined，所以检查null / undefined
	// svg  -  https://bugzilla.mozilla.org/show_bug.cgi?id=649285
	// MathML  -  https://bugzilla.mozilla.org/show_bug.cgi?id=491668
	if（val <= 0 || val == null）{

		//如果需要，可以回到计算然后未计算的css
		val = curCSS（elem，name，styles）;
		if（val <0 || val == null）{
			val = elem.style [name];
		}

		//计算单位不是像素。停在这里然后回来。
		if（rnumnonpx.test（val））{
			返回;
		}

		//如果浏览器返回不可靠的值，我们需要检查样式
		//为getComputedStyle默默地回归到可靠的elem.style
		valueIsBorderBox = isBorderBox &&
			（support.boxSizingReliable（）|| val === elem.style [name]）;

		//标准化“”，自动，并准备额外的
		val = parseFloat（val）|| 0;
	}

	//使用活动的box-sizing模型来添加/减去不相关的样式
	回归（val +
		augmentWidthOrHeight（
			ELEM，
			名称，
			额外的|| （isBorderBox？“border”：“content”），
			valueIsBorderBox，
			款式
		）
	）+“px”;
}

jQuery.extend（{

	//添加样式属性挂钩以覆盖默认值
	//获取和设置样式属性的行为
	cssHooks：{
		不透明度：{
			get：function（elem，computed）{
				if（computed）{

					//我们应该总是从不透明度中得到一个数字
					var ret = curCSS（elem，“opacity”）;
					return ret ===“”？“1”：ret;
				}
			}
		}
	}，

	//不要自动将“px”添加到这些可能无单元的属性中
	cssNumber：{
		“animationIterationCount”：是的，
		“columnCount”：是的，
		“fillOpacity”：是的，
		“flexGrow”：是的，
		“flexShrink”：是的，
		“fontWeight”：是的，
		“lineHeight”：是的，
		“不透明”：是的，
		“秩序”：是的，
		“孤儿”：是的，
		“寡妇”：是的，
		“zIndex”：是的，
		“缩放”：是的
	}，

	//添加以前要修复其名称的属性
	//设置或获取值
	cssProps：{

		// normalize float css属性
		“float”：support.cssFloat？“cssFloat”：“styleFloat”
	}，

	//在DOM节点上获取并设置样式属性
	style：function（elem，name，value，extra）{

		//不要在文本和注释节点上设置样式
		if（！elem || elem.nodeType === 3 || elem.nodeType === 8 ||！elem.style）{
			返回;
		}

		//确保我们正在使用正确的名称
		var ret，type，hooks，
			origName = jQuery.camelCase（name），
			style = elem.style;

		name = jQuery.cssProps [origName] ||
			（jQuery.cssProps [origName] = vendorPropName（origName）|| origName）;

		//获取前缀版本的钩子
		//后跟未加前缀的版本
		hooks = jQuery.cssHooks [name] || jQuery.cssHooks [origName];

		//检查我们是否设置了值
		if（value！== undefined）{
			type = typeof value;

			//将“+ =”或“ -  =”转换为相对数字（＃7345）
			if（type ===“string”&&（ret = rcssNum.exec（value））&& ret [1]）{
				value = adjustCSS（elem，name，ret）;

				//修复了错误＃9237
				type =“number”;
			}

			//确保未设置null和NaN值。见：＃7116
			if（value == null || value！== value）{
				返回;
			}

			//如果传入了一个数字，添加单位（某些CSS属性除外）
			if（type ===“number”）{
				值+ = ret && ret [3] || （jQuery.cssNumber [origName]？“”：“px”）;
			}

			//修复＃8908，通过在cssHooks中指定setter，可以更正确地完成它，
			//但这意味着要定义八个
			//（对于每个有问题的属性）相同的功能
			if（！support.clearCloneStyle && value ===“”&& name.indexOf（“background”）=== 0）{
				style [name] =“inherit”;
			}

			//如果提供了一个钩子，请使用该值，否则只需设置指定的值
			if（！hooks ||！（挂钩中的“set”）||
				（value = hooks.set（elem，value，extra））！== undefined）{

				//支持：IE
				//从'无效'CSS值中吞下错误（＃5509）
				尝试{
					style [name] = value;
				} catch（e）{}
			}

		} else {

			//如果提供了一个钩子，那么从那里得到非计算值
			if（hooks &&“get”in hooks &&
				（ret = hooks.get（elem，false，extra））！== undefined）{

				返回;
			}

			//否则只从样式对象中获取值
			返回样式[名称];
		}
	}，

	css：function（elem，name，extra，styles）{
		var num，val，hooks，
			origName = jQuery.camelCase（name）;

		//确保我们正在使用正确的名称
		name = jQuery.cssProps [origName] ||
			（jQuery.cssProps [origName] = vendorPropName（origName）|| origName）;

		//获取前缀版本的钩子
		//后跟未加前缀的版本
		hooks = jQuery.cssHooks [name] || jQuery.cssHooks [origName];

		//如果提供了一个钩子，那么从那里获取计算值
		if（hooks &&“get”in hooks）{
			val = hooks.get（elem，true，extra）;
		}

		//否则，如果存在获取计算值的方法，请使用它
		if（val === undefined）{
			val = curCSS（elem，name，styles）;
		}

		//将“normal”转换为计算值
		if（val ===“normal”&& cssNormalTransform中的name）{
			val = cssNormalTransform [name];
		}

		//返回，如果强制转换为数字或提供限定符且val看起来是数字
		if（extra ===“”|| extra）{
			num = parseFloat（val）;
			return extra === true || isFinite（num）？num || 0：val;
		}
		返回;
	}
}）;

jQuery.each（[“height”，“width”]，function（i，name）{
	jQuery.cssHooks [name] = {
		get：function（elem，computed，extra）{
			if（computed）{

				//如果我们无形地显示它们，某些元素可以有维度信息
				//但是，它必须具有可以从中受益的当前显示样式
				return rdisplayswap.test（jQuery.css（elem，“display”））&&
					elem.offsetWidth === 0？
						swap（elem，cssShow，function（）{
							return getWidthOrHeight（elem，name，extra）;
						}）：
						getWidthOrHeight（elem，name，extra）;
			}
		}，

		set：function（elem，value，extra）{
			var styles = extra && getStyles（elem）;
			return setPositiveNumber（elem，value，extra？
				augmentWidthOrHeight（
					ELEM，
					名称，
					额外，
					support.boxSizing &&
						jQuery.css（elem，“boxSizing”，false，styles）===“border-box”，
					款式
				）：0
			）;
		}
	};
}）;

if（！support.opacity）{
	jQuery.cssHooks.opacity = {
		get：function（elem，computed）{

			// IE使用过滤器进行不透明度
			return ropacity.test（（computed && elem.currentStyle？
				elem.currentStyle.filter：
				elem.style.filter）|| “”）？
					（0.01 * parseFloat（RegExp。$ 1））+“”：
					计算？“1”：“”;
		}，

		set：function（elem，value）{
			var style = elem.style，
				currentStyle = elem.currentStyle，
				opacity = jQuery.isNumeric（value）？“alpha（opacity =”+ value * 100 +“）”：“”，
				filter = currentStyle && currentStyle.filter || style.filter || “”;

			//如果没有布局，IE浏览器会出现不透明问题
			//通过设置缩放级别强制它
			style.zoom = 1;

			//如果将不透明度设置为1，并且不存在其他过滤器 - 
			//尝试删除过滤器属性＃6652
			//如果值===“”，则删除内联不透明度＃12685
			if（（value> = 1 || value ===“”）&&
					jQuery.trim（filter.replace（ralpha，“”））===“”&&
					style.removeAttribute）{

				//将style.filter设置为null，“”和“”仍然在cssText中留下“filter：”
				//如果“filter：”完全存在，则clearType被禁用，我们希望避免这种情况
				// style.removeAttribute是IE Only，但显然是这段代码路径......
				style.removeAttribute（“filter”）;

				//如果css规则中没有应用过滤器样式
				//或取消设置内联不透明度，我们完成了
				if（value ===“”|| currentStyle &&！currentStyle.filter）{
					返回;
				}
			}

			//否则，设置新的过滤器值
			style.filter = ralpha.test（过滤器）？
				filter.replace（ralpha，opacity）：
				过滤+“”+不透明度;
		}
	};
}

jQuery.cssHooks.marginRight = addGetHookIf（support.reliableMarginRight，
	function（elem，calculated）{
		if（computed）{
			return swap（elem，{“display”：“inline-block”}，
				curCSS，[elem，“marginRight”]）;
		}
	}
）;

jQuery.cssHooks.marginLeft = addGetHookIf（support.reliableMarginLeft，
	function（elem，calculated）{
		if（computed）{
			回来（
				parseFloat（curCSS（elem，“marginLeft”））||

				//支持：IE <= 11 +
				//在IE中断开连接的节点上运行getBoundingClientRect会引发错误
				//支持：仅限IE8
				//在断开连接的元素上出现getClientRects（）错误
				（jQuery.contains（elem.ownerDocument，elem）？
					elem.getBoundingClientRect（）。left  - 
						swap（elem，{marginLeft：0}，function（）{
							return elem.getBoundingClientRect（）。left;
						}）：
					0
				）
			）+“px”;
		}
	}
）;

//动画使用这些钩子来扩展属性
jQuery.each（{
	保证金：“”，
	填充：“”，
	边框：“宽度”
}，function（prefix，suffix）{
	jQuery.cssHooks [prefix + suffix] = {
		expand：function（value）{
			var i = 0，
				expanded = {}，

				//如果不是字符串，则假定一个数字
				parts = typeof value ===“string”？value.split（“”）：[value];

			for（; i <4; i ++）{
				expanded [prefix + cssExpand [i] + suffix] =
					部分[i] || 部分[i  -  2] || 零件[0];
			}

			回归扩大;
		}
	};

	if（！rmargin.test（prefix））{
		jQuery.cssHooks [prefix + suffix] .set = setPositiveNumber;
	}
}）;

jQuery.fn.extend（{
	css：function（name，value）{
		return access（this，function（elem，name，value）{
			var styles，len，
				map = {}，
				i = 0;

			if（jQuery.isArray（name））{
				styles = getStyles（elem）;
				len = name.length;

				for（; i <len; i ++）{
					map [name [i]] = jQuery.css（elem，name [i]，false，styles）;
				}

				返回地图;
			}

			返回值！== undefined？
				jQuery.style（elem，name，value）：
				jQuery.css（elem，name）;
		}，name，value，arguments.length> 1）;
	}，
	show：function（）{
		return showHide（this，true）;
	}，
	hide：function（）{
		return showHide（this）;
	}，
	toggle：function（state）{
		if（typeof state ===“boolean”）{
			返回状态？this.show（）：this.hide（）;
		}

		return this.each（function（）{
			if（isHidden（this））{
				jQuery（this）.show（）;
			} else {
				jQuery（this）.hide（）;
			}
		}）;
	}
}）;


function Tween（elem，options，prop，end，easing）{
	返回新的Tween.prototype.init（elem，options，prop，end，easing）;
}
jQuery.Tween = Tween;

Tween.prototype = {
	构造函数：Tween，
	init：function（elem，options，prop，end，easing，unit）{
		this.elem = elem;
		this.prop = prop;
		this.easing = easing || jQuery.easing._default;
		this.options = options;
		this.start = this.now = this.cur（）;
		this.end = end;
		this.unit = unit || （jQuery.cssNumber [prop]？“”：“px”）;
	}，
	cur：function（）{
		var hooks = Tween.propHooks [this.prop];

		return hooks && hooks.get？
			hooks.get（this）：
			Tween.propHooks._default.get（this）;
	}，
	run：function（percent）{
		变差，
			hooks = Tween.propHooks [this.prop];

		if（this.options.duration）{
			this.pos = eased = jQuery.easing [this.easing]（
				％，this.options.duration * percent，0,1，this.options.duration
			）;
		} else {
			this.pos = eased = percent;
		}
		this.now =（this.end  -  this.start）* eased + this.start;

		if（this.options.step）{
			this.options.step.call（this.elem，this.now，this）;
		}

		if（hooks && hooks.set）{
			hooks.set（this）;
		} else {
			Tween.propHooks._default.set（this）;
		}
		归还这个;
	}
};

Tween.prototype.init.prototype = Tween.prototype;

Tween.propHooks = {
	_default：{
		get：function（tween）{
			变量结果;

			//当元素不是DOM元素时，直接在元素上使用属性，
			//或者当没有匹配的样式属性存在时。
			if（tween.elem.nodeType！== 1 ||
				tween.elem [tween.prop]！= null && tween.elem.style [tween.prop] == null）{
				return tween.elem [tween.prop];
			}

			//将一个空字符串作为第三个参数传递给.css将自动执行
			//如果解析失败，则尝试使用parseFloat并回退到字符串
			//所以，简单的值，如“10px”被解析为Float。
			//按原样返回复杂值，例如“rotate（1rad）”。
			result = jQuery.css（tween.elem，tween.prop，“”）;

			//空字符串，null，undefined和“auto”转换为0。
			返回！结果|| 结果===“自动”？0：结果;
		}，
		set：function（tween）{

			//使用step hook for back compat  - 如果它在那里使用cssHook  - 如果它使用.style
			//可用并在可用的地方使用普通属性
			if（jQuery.fx.step [tween.prop]）{
				jQuery.fx.step [tween.prop]（补间）;
			} else if（tween.elem.nodeType === 1 &&
				（tween.elem.style [jQuery.cssProps [tween.prop]]！= null ||
					jQuery.cssHooks [tween.prop]））{
				jQuery.style（tween.elem，tween.prop，tween.now + tween.unit）;
			} else {
				tween.elem [tween.prop] = tween.now;
			}
		}
	}
};

//支持：IE <= 9
//基于恐慌的方法在断开连接的节点上设置东西

Tween.propHooks.scrollTop = Tween.propHooks.scrollLeft = {
	set：function（tween）{
		if（tween.elem.nodeType && tween.elem.parentNode）{
			tween.elem [tween.prop] = tween.now;
		}
	}
};

jQuery.easing = {
	linear：function（p）{
		返回p;
	}，
	swing：function（p）{
		返回0.5  -  Math.cos（p * Math.PI）/ 2;
	}，
	_default：“摇摆”
};

jQuery.fx = Tween.prototype.init;

//返回Compat <1.8扩展点
jQuery.fx.step = {};




VAR
	fxNow，timerId，
	rfxtypes = / ^（？：toggle | show | hide）$ /，
	rrun = / queueHooks $ /;

//同步创建的动画将同步运行
function createFxNow（）{
	window.setTimeout（function（）{
		fxNow = undefined;
	}）;
	return（fxNow = jQuery.now（））;
}

//生成参数以创建标准动画
function genFx（type，includeWidth）{
	var哪个，
		attrs = {height：type}，
		i = 0;

	//如果我们包含width，则步长值为1来执行所有cssExpand值，
	//如果我们不包含宽度，则步长值为2以跳过左右
	includeWidth = includeWidth？1：0;
	for（; i <4; i + = 2  -  includeWidth）{
		which = cssExpand [i];
		attrs [“margin”+ which] = attrs [“padding”+ which] = type;
	}

	if（includeWidth）{
		attrs.opacity = attrs.width = type;
	}

	返回;
}

function createTween（value，prop，animation）{
	var tween，
		collection =（Animation.tweeners [prop] || []）.concat（Animation.tweeners [“*”]），
		index = 0，
		length = collection.length;
	for（; index <length; index ++）{
		if（（tween = collection [index] .call（animation，prop，value）））{

			//我们已经完成了这个属性
			返回补间;
		}
	}
}

function defaultPrefilter（elem，props，opts）{
	/ * jshint validthis：true * /
	var prop，value，toggle，tween，hooks，oldfire，display，checkDisplay，
		动画=这个，
		orig = {}，
		style = elem.style，
		hidden = elem.nodeType && isHidden（elem），
		dataShow = jQuery._data（elem，“fxshow”）;

	// handle queue：false promises
	if（！opts.queue）{
		hooks = jQuery._queueHooks（elem，“fx”）;
		if（hooks.unqueued == null）{
			hooks.unqueued = 0;
			oldfire = hooks.empty.fire;
			hooks.empty.fire = function（）{
				if（！hooks.unqueued）{
					oldfire（）;
				}
			};
		}
		hooks.unqueued ++;

		anim.always（function（）{

			//执行此操作可确保将调用完整的处理程序
			//在此之前完成
			anim.always（function（）{
				hooks.unqueued--;
				if（！jQuery.queue（elem，“fx”）。length）{
					hooks.empty.fire（）;
				}
			}）;
		}）;
	}

	//高度/宽度溢出通过
	if（elem.nodeType === 1 &&（props中的“height”|道具中的“width”））{

		//确保没有任何东西偷偷溜走
		//记录所有3个溢出属性，因为IE没有
		//在overflowX和时更改overflow属性
		// overflowY设置为相同的值
		opts.overflow = [style.overflow，style.overflowX，style.overflowY];

		//将显示属性设置为高度/宽度的内联块
		//对具有宽度/高度动画的内联元素的动画
		display = jQuery.css（elem，“display”）;

		//如果显示当前为“无”，则测试默认显示
		checkDisplay = display ===“none”？
			jQuery._data（elem，“olddisplay”）|| defaultDisplay（elem.nodeName）：display;

		if（checkDisplay ===“inline”&& jQuery.css（elem，“float”）===“none”）{

			//内联级元素接受内联块;
			//块级元素需要与布局内联
			if（！support.inlineBlockNeedsLayout || defaultDisplay（elem.nodeName）===“inline”）{
				style.display =“inline-block”;
			} else {
				style.zoom = 1;
			}
		}
	}

	if（opts.overflow）{
		style.overflow =“hidden”;
		if（！support.shrinkWrapBlocks（））{
			anim.always（function（）{
				style.overflow = opts.overflow [0];
				style.overflowX = opts.overflow [1];
				style.overflowY = opts.overflow [2];
			}）;
		}
	}

	//显示/隐藏传球
	for（prop in props）{
		value = props [prop];
		if（rfxtypes.exec（value））{
			删除道具[prop];
			toggle = toggle || 值===“切换”;
			if（value ===（hidden？“hide”：“show”））{

				//如果从停止的隐藏或显示中遗留了dataShow
				//我们要继续演出，我们应该假装隐藏
				if（value ===“show”&& dataShow && dataShow [prop]！== undefined）{
					hidden = true;
				} else {
					继续;
				}
			}
			orig [prop] = dataShow && dataShow [prop] || jQuery.style（elem，prop）;

		//任何非fx值都会阻止我们恢复原始显示值
		} else {
			display = undefined;
		}
	}

	if（！jQuery.isEmptyObject（orig））{
		if（dataShow）{
			if（dataShow中的“hidden”）{
				hidden = dataShow.hidden;
			}
		} else {
			dataShow = jQuery._data（elem，“fxshow”，{}）;
		}

		//存储状态，如果它的切换 - 启用.stop（）。toggle（）到“反向”
		if（toggle）{
			dataShow.hidden =！hidden;
		}
		if（hidden）{
			jQuery（elem）.show（）;
		} else {
			anim.done（function（）{
				jQuery（elem）.hide（）;
			}）;
		}
		anim.done（function（）{
			var prop;
			jQuery._removeData（elem，“fxshow”）;
			for（prop in orig）{
				jQuery.style（elem，prop，orig [prop]）;
			}
		}）;
		for（prop in orig）{
			tween = createTween（hidden？dataShow [prop]：0，prop，anim）;

			if（！（dataShow中的prop））{
				dataShow [prop] = tween.start;
				if（hidden）{
					tween.end = tween.start;
					tween.start = prop ===“width”|| 道具===“身高”？1：0;
				}
			}
		}

	//如果这是像.hide（）。hide（）这样的noop，则恢复覆盖的显示值
	} else if（（display ===“none”？defaultDisplay（elem.nodeName）：display）===“inline”）{
		style.display = display;
	}
}

function propFilter（props，specialEasing）{
	var index，name，easing，value，hooks;

	// camelCase，specialEasing并展开cssHook传递
	for（道具中的索引）{
		name = jQuery.camelCase（index）;
		easing = specialEasing [name];
		value = props [index];
		if（jQuery.isArray（value））{
			easing = value [1];
			value = props [index] = value [0];
		}

		if（index！== name）{
			道具[名称] =价值;
			删除道具[索引];
		}

		hooks = jQuery.cssHooks [name];
		if（hooks &&“expand”in hooks）{
			value = hooks.expand（value）;
			删除道具[名称];

			//不是$ .extend，这不会覆盖已经存在的键。
			//也 - 从上面重用'index'因为我们有正确的“名字”
			for（index in value）{
				if（！（props in props））{
					道具[index] =价值[指数];
					specialEasing [index] =缓和;
				}
			}
		} else {
			specialEasing [name] = easing;
		}
	}
}

function动画（elem，properties，options）{
	var结果，
		停了下来，
		index = 0，
		length = Animation.prefilters.length，
		deferred = jQuery.Deferred（）。always（function（）{

			//不匹配：动画选择器中的elem
			删除tick.elem;
		}），
		tick = function（）{
			if（已停止）{
				返回false;
			}
			var currentTime = fxNow || createFxNow（）
				remaining = Math.max（0，animation.startTime + animation.duration  -  currentTime），

				//支持：Android 2.3
				//过时的崩溃bug不允许我们使用`1  - （0.5 || 0）`（＃12497）
				temp = remaining / animation.duration || 0，
				百分比= 1  - 临时，
				index = 0，
				length = animation.tweens.length;

			for（; index <length; index ++）{
				animation.tweens [index] .run（percent）;
			}

			deferred.notifyWith（elem，[animation，percent，remaining]）;

			if（percent <1 && length）{
				返回剩余;
			} else {
				deferred.resolveWith（elem，[animation]）;
				返回false;
			}
		}，
		animation = deferred.promise（{
			elem：elem，
			props：jQuery.extend（{}，properties），
			opts：jQuery.extend（true，{
				specialEasing：{}，
				缓动：jQuery.easing._default
			}，选项），
			originalProperties：属性，
			originalOptions：选项，
			startTime：fxNow || createFxNow（）
			duration：options.duration，
			补间：[]，
			createTween：function（prop，end）{
				var tween = jQuery.Tween（elem，animation.opts，prop，end，
						animation.opts.specialEasing [prop] || animation.opts.easing）;
				animation.tweens.push（tween）;
				返回补间;
			}，
			stop：function（gotoEnd）{
				var index = 0，

					//如果我们要结束，我们想要运行所有的补间
					//否则我们跳过这部分
					length = gotoEnd？animation.tweens.length：0;
				if（已停止）{
					归还这个;
				}
				停止=真;
				for（; index <length; index ++）{
					animation.tweens [index] .run（1）;
				}

				//当我们播放最后一帧时解析
				//否则，拒绝
				if（gotoEnd）{
					deferred.notifyWith（elem，[animation，1,0]）;
					deferred.resolveWith（elem，[animation，gotoEnd]）;
				} else {
					deferred.rejectWith（elem，[animation，gotoEnd]）;
				}
				归还这个;
			}
		}），
		props = animation.props;

	propFilter（props，animation.opts.specialEasing）;

	for（; index <length; index ++）{
		result = Animation.prefilters [index] .call（animation，elem，props，animation.opts）;
		if（result）{
			if（jQuery.isFunction（result.stop））{
				jQuery._queueHooks（animation.elem，animation.opts.queue）.stop =
					jQuery.proxy（result.stop，result）;
			}
			返回结果;
		}
	}

	jQuery.map（props，createTween，animation）;

	if（jQuery.isFunction（animation.opts.start））{
		animation.opts.start.call（elem，animation）;
	}

	jQuery.fx.timer（
		jQuery.extend（tick，{
			elem：elem，
			动画：动画，
			queue：animation.opts.queue
		}）
	）;

	//附加选项的回调
	return animation.progress（animation.opts.progress）
		.done（animation.opts.done，animation.opts.complete）
		.fail（animation.opts.fail）
		.always（animation.opts.always）;
}

jQuery.Animation = jQuery.extend（Animation，{

	tweeners：{
		“*”：[function（prop，value）{
			var tween = this.createTween（prop，value）;
			adjustCSS（tween.elem，prop，rcssNum.exec（value），tween）;
			返回补间;
		}]
	}，

	tweener：function（props，callback）{
		if（jQuery.isFunction（props））{
			callback = props;
			props = [“*”];
		} else {
			props = props.match（rnotwhite）;
		}

		var prop，
			index = 0，
			length = props.length;

		for（; index <length; index ++）{
			prop = props [index];
			Animation.tweeners [prop] = Animation.tweeners [prop] || [];
			Animation.tweeners [prop] .unshift（callback）;
		}
	}，

	prefilters：[defaultPrefilter]，

	prefilter：function（callback，prepend）{
		if（prepend）{
			Animation.prefilters.unshift（回调）;
		} else {
			Animation.prefilters.push（回调）;
		}
	}
}）;

jQuery.speed = function（speed，easing，fn）{
	var opt = speed && typeof speed ===“object”？jQuery.extend（{}，speed）：{
		完成：fn || ！fn && easing ||
			jQuery.isFunction（速度）&&速度，
		持续时间：速度，
		缓和：fn &&缓和|| 缓和&&！jQuery.isFunction（缓和）&&缓和
	};

	opt.duration = jQuery.fx.off？0：typeof opt.duration ===“number”？选择：
		jQuery.fx.speeds中的opt.duration？
			jQuery.fx.speeds [opt.duration]：jQuery.fx.speeds._default;

	// normalize opt.queue  -  true / undefined / null  - >“fx”
	if（opt.queue == null || opt.queue === true）{
		opt.queue =“fx”;
	}

	//排队
	opt.old = opt.complete;

	opt.complete = function（）{
		if（jQuery.isFunction（opt.old））{
			opt.old.call（this）;
		}

		if（opt.queue）{
			jQuery.dequeue（this，opt.queue）;
		}
	};

	返回选择;
};

jQuery.fn.extend（{
	fadeTo：function（speed，to，easing，callback）{

		//将不透明度设置为0后显示任何隐藏元素
		return this.filter（isHidden）.css（“opacity”，0）.show（）

			//为指定的值设置动画
			.end（）。animate（{opacity：to}，speed，easing，callback）;
	}，
	animate：function（prop，speed，easing，callback）{
		var empty = jQuery.isEmptyObject（prop），
			optall = jQuery.speed（speed，easing，callback），
			doAnimation = function（）{

				//在prop的副本上操作，这样每个属性的缓和不会丢失
				var anim = Animation（this，jQuery.extend（{}，prop），optall）;

				//清空动画，或立即完成结算
				if（empty || jQuery._data（this，“finish”））{
					anim.stop（true）;
				}
			};
			doAnimation.finish = doAnimation;

		返回空|| optall.queue === false？
			this.each（doAnimation）：
			this.queue（optall.queue，doAnimation）;
	}，
	stop：function（type，clearQueue，gotoEnd）{
		var stopQueue = function（hooks）{
			var stop = hooks.stop;
			delete hooks.stop;
			停止（gotoEnd）;
		};

		if（typeof type！==“string”）{
			gotoEnd = clearQueue;
			clearQueue = type;
			type = undefined;
		}
		if（clearQueue && type！== false）{
			this.queue（type ||“fx”，[]）;
		}

		return this.each（function（）{
			var dequeue = true，
				index = type！= null && type +“queueHooks”，
				timers = jQuery.timers，
				data = jQuery._data（this）;

			if（index）{
				if（data [index] && data [index] .stop）{
					stopQueue（data [index]）;
				}
			} else {
				for（数据中的索引）{
					if（data [index] && data [index] .stop && rrun.test（index））{
						stopQueue（data [index]）;
					}
				}
			}

			for（index = timers.length; index--;）{
				if（timers [index] .elem === this &&
					（type == null || timers [index] .queue === type））{

					timers [index] .anim.stop（gotoEnd）;
					dequeue = false;
					timers.splice（index，1）;
				}
			}

			//如果未强制执行最后一步，则启动队列中的下一个
			//定时器当前将调用它们的完整回调，它将出列
			//但仅限于他们是gotoEnd
			if（dequeue ||！gotoEnd）{
				jQuery.dequeue（this，type）;
			}
		}）;
	}，
	完成：function（type）{
		if（type！== false）{
			type = type || “FX”;
		}
		return this.each（function（）{
			var index，
				data = jQuery._data（this），
				queue = data [type +“queue”]，
				hooks = data [type +“queueHooks”]，
				timers = jQuery.timers，
				长度=队列？queue.length：0;

			//在私人数据上启用整理标记
			data.finish = true;

			//首先清空队列
			jQuery.queue（this，type，[]）;

			if（hooks && hooks.stop）{
				hooks.stop.call（this，true）;
			}

			//查找任何活动动画，并完成它们
			for（index = timers.length; index--;）{
				if（timers [index] .elem === this && timers [index] .queue === type）{
					timers [index] .anim.stop（true）;
					timers.splice（index，1）;
				}
			}

			//在旧队列中查找任何动画并完成它们
			for（index = 0; index <length; index ++）{
				if（queue [index] && queue [index] .finish）{
					queue [index] .finish.call（this）;
				}
			}

			//关闭完成标志
			删除data.finish;
		}）;
	}
}）;

jQuery.each（[“toggle”，“show”，“hide”]，function（i，name）{
	var cssFn = jQuery.fn [name];
	jQuery.fn [name] = function（speed，easing，callback）{
		返回速度== null || typeof speed ===“boolean”？
			cssFn.apply（this，arguments）：
			this.animate（genFx（name，true），speed，easing，callback）;
	};
}）;

//生成自定义动画的快捷方式
jQuery.each（{
	slideDown：genFx（“show”），
	slideUp：genFx（“hide”），
	slideToggle：genFx（“toggle”），
	fadeIn：{opacity：“show”}，
	fadeOut：{opacity：“hide”}，
	fadeToggle：{opacity：“toggle”}
}，function（name，props）{
	jQuery.fn [name] = function（speed，easing，callback）{
		返回this.animate（道具，速度，缓和，回调）;
	};
}）;

jQuery.timers = [];
jQuery.fx.tick = function（）{
	var计时器，
		timers = jQuery.timers，
		i = 0;

	fxNow = jQuery.now（）;

	for（; i <timers.length; i ++）{
		timer = timers [i];

		//检查计时器是否尚未删除
		if（！timer（）&& timers [i] === timer）{
			timers.splice（i  - ，1）;
		}
	}

	if（！timers.length）{
		jQuery.fx.stop（）;
	}
	fxNow = undefined;
};

jQuery.fx.timer = function（timer）{
	jQuery.timers.push（timer）;
	if（timer（））{
		jQuery.fx.start（）;
	} else {
		jQuery.timers.pop（）;
	}
};

jQuery.fx.interval = 13;

jQuery.fx.start = function（）{
	if（！timerId）{
		timerId = window.setInterval（jQuery.fx.tick，jQuery.fx.interval）;
	}
};

jQuery.fx.stop = function（）{
	window.clearInterval（timerId）;
	timerId = null;
};

jQuery.fx.speeds = {
	慢：600，
	快：200，

	//默认速度
	_default：400
};


//基于Clint Helfers的插件，经许可。
// http://web.archive.org/web/20100324014747/http://blindsignals.com/index.php/2009/07/jquery-delay/
jQuery.fn.delay = function（time，type）{
	time = jQuery.fx？jQuery.fx.speeds [time] || 时间：时间;
	type = type || “FX”;

	return this.queue（type，function（next，hooks）{
		var timeout = window.setTimeout（next，time）;
		hooks.stop = function（）{
			window.clearTimeout（timeout）;
		};
	}）;
};


（function（）{
	var a，
		input = document.createElement（“input”），
		div = document.createElement（“div”），
		select = document.createElement（“select”），
		opt = select.appendChild（document.createElement（“option”））;

	// 建立
	div = document.createElement（“div”）;
	div.setAttribute（“className”，“t”）;
	div.innerHTML =“<link /> <table> </ table> <a href='/a'> a </a> <input type ='checkbox'/>”;
	a = div.getElementsByTagName（“a”）[0];

	//支持：Windows Web Apps（WWA）
	//`type`必须使用.setAttribute for WWA（＃14901）
	input.setAttribute（“type”，“checkbox”）;
	div.appendChild（输入）;

	a = div.getElementsByTagName（“a”）[0];

	//第一批测试
	a.style.cssText =“top：1px”;

	//在camelCase类上测试setAttribute。
	//如果它有效，我们在执行get / setAttribute（ie6 / 7）时需要attrFix
	support.getSetAttribute = div.className！==“t”;

	//从getAttribute获取样式信息
	//（IE使用.cssText代替）
	support.style = /top/.test(a.getAttribute（“style”））;

	//确保不操纵URL
	//（IE默认将其标准化）
	support.hrefNormalized = a.getAttribute（“href”）===“/ a”;

	//检查默认复选框/无线电值（WebKit上的“”;其他地方的“on”）
	support.checkOn = !! input.value;

	//确保选择的默认选项具有选定属性。
	//（WebKit默认为false而不是true，IE也是如果它在optgroup中）
	support.optSelected = opt.selected;

	//测试表单上的enctype支持（＃6743）
	support.enctype = !! document.createElement（“form”）.enctype;

	//确保禁用选项内的选项未标记为已禁用
	//（WebKit将它们标记为已禁用）
	select.disabled = true;
	support.optDisabled =！opt.disabled;

	//支持：仅限IE8
	//检查我们是否可以信任getAttribute（“value”）
	input = document.createElement（“input”）;
	input.setAttribute（“value”，“”）;
	support.input = input.getAttribute（“value”）===“”;

	//检查输入在成为收音机后是否保持其值
	input.value =“t”;
	input.setAttribute（“type”，“radio”）;
	support.radioValue = input.value ===“t”;
}）（）;


var rreturn = / \ r / g，
	rspaces = / [\ x20 \ t \ r \ n \ f] + / g;

jQuery.fn.extend（{
	val：function（value）{
		var hooks，ret，isFunction，
			elem = this [0];

		if（！arguments.length）{
			if（elem）{
				hooks = jQuery.valHooks [elem.type] ||
					jQuery.valHooks [elem.nodeName.toLowerCase（）];

				如果（
					钩子&&
					钩子中的“get”&&
					（ret = hooks.get（elem，“value”））！== undefined
				）{
					返回;
				}

				ret = elem.value;

				return typeof ret ===“string”？

					//处理最常见的字符串案例
					ret.replace（rreturn，“”）：

					//处理value为null / undef或number的情况
					ret == null？“”：ret;
			}

			返回;
		}

		isFunction = jQuery.isFunction（value）;

		return this.each（function（i）{
			var val;

			if（this.nodeType！== 1）{
				返回;
			}

			if（isFunction）{
				val = value.call（this，i，jQuery（this）.val（））;
			} else {
				val =值;
			}

			//将null / undefined视为“”; 将数字转换为字符串
			if（val == null）{
				val =“”;
			} else if（typeof val ===“number”）{
				val + =“”;
			} else if（jQuery.isArray（val））{
				val = jQuery.map（val，function（value）{
					返回值== null？“”：值+“”;
				}）;
			}

			hooks = jQuery.valHooks [this.type] || jQuery.valHooks [this.nodeName.toLowerCase（）];

			//如果set返回undefined，则回退到正常设置
			if（！hooks ||！（挂钩中的“set”）|| hooks.set（this，val，“value”）=== undefined）{
				this.value = val;
			}
		}）;
	}
}）;

jQuery.extend（{
	valHooks：{
		选项： {
			get：function（elem）{
				var val = jQuery.find.attr（elem，“value”）;
				return val！= null？
					val：

					//支持：IE10-11 +
					// option.text抛出异常（＃14686，＃14858）
					//剥离并折叠空格
					// https://html.spec.whatwg.org/#strip-and-collapse-whitespace
					jQuery.trim（jQuery.text（elem））.replace（rspaces，“”）;
			}
		}，
		选择： {
			get：function（elem）{
				var值，选项，
					options = elem.options，
					index = elem.selectedIndex，
					one = elem.type ===“select-one”|| 指数<0，
					值=一？空值 ： []，
					最大=一？index + 1：options.length，
					i =指数<0？
						最大值：
						一个？指数：0;

				//遍历所有选定的选项
				for（; i <max; i ++）{
					option = options [i];

					//表单重置后，oldIE不会更新（＃2551）
					if（（option.selected || i === index）&&

							//不返回已禁用的选项或禁用的optgroup中的选项
							（support.optDisabled？
								！option.disabled：
								option.getAttribute（“disabled”）=== null）&&
							（！option.parentNode.disabled ||
								！jQuery.nodeName（option.parentNode，“optgroup”）））{

						//获取选项的特定值
						value = jQuery（option）.val（）;

						//我们不需要一个数组用于一个选择
						如果一个 ） {
							回报值;
						}

						// Multi-Selects返回一个数组
						values.push（value）;
					}
				}

				回报值;
			}，

			set：function（elem，value）{
				var optionSet，option，
					options = elem.options，
					values = jQuery.makeArray（value），
					i = options.length;

				当我 -  ） {
					option = options [i];

					if（jQuery.inArray（jQuery.valHooks.option.get（option），values）> -1）{

						//支持：IE6
						//当我们需要将新选项元素添加到选择框时
						//强制重新添加节点的重排以便解决延迟问题
						//初始化属性
						尝试{
							option.selected = optionSet = true;

						} catch（_）{

							//将仅在IE6中执行
							option.scrollHeight;
						}

					} else {
						option.selected = false;
					}
				}

				//强制浏览器在设置非匹配值时表现一致
				if（！optionSet）{
					elem.selectedIndex = -1;
				}

				回报选项;
			}
		}
	}
}）;

//无线电和复选框getter / setter
jQuery.each（[“radio”，“checkbox”]，function（）{
	jQuery.valHooks [this] = {
		set：function（elem，value）{
			if（jQuery.isArray（value））{
				return（elem.checked = jQuery.inArray（jQuery（elem）.val（），value）> -1）;
			}
		}
	};
	if（！support.checkOn）{
		jQuery.valHooks [this] .get = function（elem）{
			return elem.getAttribute（“value”）=== null？“on”：elem.value;
		};
	}
}）;




var nodeHook，boolHook，
	attrHandle = jQuery.expr.attrHandle，
	ruseDefault = / ^（？：选中|选中）$ / i，
	getSetAttribute = support.getSetAttribute，
	getSetInput = support.input;

jQuery.fn.extend（{
	attr：function（name，value）{
		return access（this，jQuery.attr，name，value，arguments.length> 1）;
	}，

	removeAttr：function（name）{
		return this.each（function（）{
			jQuery.removeAttr（this，name）;
		}）;
	}
}）;

jQuery.extend（{
	attr：function（elem，name，value）{
		var ret，hooks，
			nType = elem.nodeType;

		//不要在文本，注释和属性节点上获取/设置属性
		if（nType === 3 || nType === 8 || nType === 2）{
			返回;
		}

		//不支持属性时回退到prop
		if（typeof elem.getAttribute ===“undefined”）{
			return jQuery.prop（elem，name，value）;
		}

		//所有属性都是小写的
		//如果定义了一个必需的钩子
		if（nType！== 1 ||！jQuery.isXMLDoc（elem））{
			name = name.toLowerCase（）;
			hooks = jQuery.attrHooks [name] ||
				（jQuery.expr.match.bool.test（name）？boolHook：nodeHook）;
		}

		if（value！== undefined）{
			if（value === null）{
				jQuery.removeAttr（elem，name）;
				返回;
			}

			if（hooks &&“set”in hooks &&
				（ret = hooks.set（elem，value，name））！== undefined）{
				返回;
			}

			elem.setAttribute（name，value +“”）;
			回报值;
		}

		if（hooks &&“get”in hooks &&（ret = hooks.get（elem，name））！== null）{
			返回;
		}

		ret = jQuery.find.attr（elem，name）;

		//不存在的属性返回null，我们规范化为undefined
		return ret == null？undefined：ret;
	}，

	attrHooks：{
		类型：{
			set：function（elem，value）{
				if（！support.radioValue && value ===“radio”&&
					jQuery.nodeName（elem，“input”））{

					//在值重置IE8-9中的值后，在单选按钮上设置类型
					//在创建期间设置值后，将值重置为默认值
					var val = elem.value;
					elem.setAttribute（“type”，value）;
					if（val）{
						elem.value = val;
					}
					回报值;
				}
			}
		}
	}，

	removeAttr：function（elem，value）{
		var name，propName，
			i = 0，
			attrNames = value && value.match（rnotwhite）;

		if（attrNames && elem.nodeType === 1）{
			while（（name = attrNames [i ++]））{
				propName = jQuery.propFix [name] || 名称;

				//布尔属性得到特殊处理（＃10870）
				if（jQuery.expr.match.bool.test（name））{

					//将相应的属性设置为false
					if（getSetInput && getSetAttribute ||！ruseDefault.test（name））{
						elem [propName] = false;

					//支持：IE <9
					//同样清除defaultChecked / defaultSelected（如果适用）
					} else {
						elem [jQuery.camelCase（“default-”+ name）] =
							elem [propName] = false;
					}

				//有关此方法的说明，请参阅＃9699（首先设置，然后删除）
				} else {
					jQuery.attr（elem，name，“”）;
				}

				elem.removeAttribute（getSetAttribute？name：propName）;
			}
		}
	}
}）;

//用于布尔属性的钩子
boolHook = {
	set：function（elem，value，name）{
		if（value === false）{

			//设置为false时删除布尔属性
			jQuery.removeAttr（elem，name）;
		} else if（getSetInput && getSetAttribute ||！ruseDefault.test（name））{

			// IE <8需要* property * name
			elem.setAttribute（！getSetAttribute && jQuery.propFix [name] || name，name）;

		} else {

			//支持：IE <9
			//对oldIE使用defaultChecked和defaultSelected
			elem [jQuery.camelCase（“default-”+ name）] = elem [name] = true;
		}
		返回名称;
	}
};

jQuery.each（jQuery.expr.match.bool.source.match（/ \ w + / g），function（i，name）{
	var getter = attrHandle [name] || jQuery.find.attr;

	if（getSetInput && getSetAttribute ||！ruseDefault.test（name））{
		attrHandle [name] = function（elem，name，isXML）{
			var ret，handle;
			if（！isXML）{

				//通过从getter暂时删除此函数来避免无限循环
				handle = attrHandle [name];
				attrHandle [name] = ret;
				ret = getter（elem，name，isXML）！= null？
					name.toLowerCase（）：
					空值;
				attrHandle [name] =句柄;
			}
			返回;
		};
	} else {
		attrHandle [name] = function（elem，name，isXML）{
			if（！isXML）{
				return elem [jQuery.camelCase（“default-”+ name）]？
					name.toLowerCase（）：
					空值;
			}
		};
	}
}）;

//修复oldIE attroperties
if（！getSetInput ||！getSetAttribute）{
	jQuery.attrHooks.value = {
		set：function（elem，value，name）{
			if（jQuery.nodeName（elem，“input”））{

				//不返回，以便也使用setAttribute
				elem.defaultValue = value;
			} else {

				//如果已定义，则使用no​​deHook（＃1954）; 否则setAttribute很好
				return nodeHook && nodeHook.set（elem，value，name）;
			}
		}
	};
}

// IE6 / 7不支持使用get / setAttribute获取/设置某些属性
if（！getSetAttribute）{

	//将此用于IE6 / 7中的任何属性
	//这几乎解决了每个IE6 / 7问题
	nodeHook = {
		set：function（elem，value，name）{

			//设置现有属性或创建新属性节点
			var ret = elem.getAttributeNode（name）;
			if（！ret）{
				elem.setAttributeNode（
					（ret = elem.ownerDocument.createAttribute（name））
				）;
			}

			ret.value = value + =“”;

			//通过使用setAttribute（＃9646）打破与克隆元素的关联
			if（name ===“value”|| value === elem.getAttribute（name））{
				回报值;
			}
		}
	};

	//未定义时，某些属性使用空字符串值构造
	attrHandle.id = attrHandle.name = attrHandle.coords =
		function（elem，name，isXML）{
			var ret;
			if（！isXML）{
				return（ret = elem.getAttributeNode（name））&& ret.value！==“”？
					ret.value：
					空值;
			}
		};

	//在按钮上修复值检索需要此模块
	jQuery.valHooks.button = {
		get：function（elem，name）{
			var ret = elem.getAttributeNode（name）;
			if（ret && ret.specified）{
				返回值;
			}
		}，
		set：nodeHook.set
	};

	//在删除时将contenteditable设置为false（＃10429）
	//设置为空字符串会将错误作为无效值抛出
	jQuery.attrHooks.contenteditable = {
		set：function（elem，value，name）{
			nodeHook.set（elem，value ===“”？false：value，name）;
		}
	};

	//在空字符串上将宽度和高度设置为auto而不是0（Bug＃8150）
	//这是为了删除
	jQuery.each（[“width”，“height”]，function（i，name）{
		jQuery.attrHooks [name] = {
			set：function（elem，value）{
				if（value ===“”）{
					elem.setAttribute（name，“auto”）;
					回报值;
				}
			}
		};
	}）;
}

if（！support.style）{
	jQuery.attrHooks.style = {
		get：function（elem）{

			//在空字符串的情况下返回undefined
			//注意：IE大写css属性名称，但是如果我们是.toLowerCase（）
			// .cssText，会破坏URL中的区分大小写，比如“后台”
			return elem.style.cssText || 不确定的;
		}，
		set：function（elem，value）{
			return（elem.style.cssText = value +“”）;
		}
	};
}




var rfocusable = / ^（？：input | select | textarea | button | object）$ / i，
	rclickable = / ^（？：a | area）$ / i;

jQuery.fn.extend（{
	prop：function（name，value）{
		return access（this，jQuery.prop，name，value，arguments.length> 1）;
	}，

	removeProp：function（name）{
		name = jQuery.propFix [name] || 名称;
		return this.each（function（）{

			// try / catch处理IE balks的情况（例如删除窗口上的属性）
			尝试{
				这个[名字] =未定义;
				删除此[名称];
			} catch（e）{}
		}）;
	}
}）;

jQuery.extend（{
	prop：function（elem，name，value）{
		var ret，hooks，
			nType = elem.nodeType;

		//不要在文本，注释和属性节点上获取/设置属性
		if（nType === 3 || nType === 8 || nType === 2）{
			返回;
		}

		if（nType！== 1 ||！jQuery.isXMLDoc（elem））{

			//修复名称并附加挂钩
			name = jQuery.propFix [name] || 名称;
			hooks = jQuery.propHooks [name];
		}

		if（value！== undefined）{
			if（hooks &&“set”in hooks &&
				（ret = hooks.set（elem，value，name））！== undefined）{
				返回;
			}

			return（elem [name] = value）;
		}

		if（hooks &&“get”in hooks &&（ret = hooks.get（elem，name））！== null）{
			返回;
		}

		return elem [name];
	}，

	propHooks：{
		tabIndex：{
			get：function（elem）{

				// elem.tabIndex并不总是返回
				//未明确设置时的正确值
				// http://fluidproject.org/blog/2008/01/09/getting-setting-and-removing-tabindex-values-with-javascript/
				//使用适当的属性检索（＃12072）
				var tabindex = jQuery.find.attr（elem，“tabindex”）;

				返回tabindex？
					parseInt（tabindex，10）：
					rfocusable.test（elem.nodeName）||
						rclickable.test（elem.nodeName）&& elem.href？
							0：
							-1;
			}
		}
	}，

	propFix：{
		“for”：“htmlFor”，
		“class”：“className”
	}
}）;

//某些属性需要在IE上进行特殊调用
// http://msdn.microsoft.com/en-us/library/ms536429%28VS.85%29.aspx
if（！support.hrefNormalized）{

	// href / src属性应获取完整的规范化URL（＃10299 /＃12915）
	jQuery.each（[“href”，“src”]，function（i，name）{
		jQuery.propHooks [name] = {
			get：function（elem）{
				return elem.getAttribute（name，4）;
			}
		};
	}）;
}

//支持：Safari，IE9 +
//访问selectedIndex属性
//强制浏览器遵守所选的设置
//在选项上
// getter确保选中默认选项
//在optgroup中
if（！support.optSelected）{
	jQuery.propHooks.selected = {
		get：function（elem）{
			var parent = elem.parentNode;

			if（parent）{
				parent.selectedIndex;

				//确保它也适用于optgroups，请参阅＃5701
				if（parent.parentNode）{
					parent.parentNode.selectedIndex;
				}
			}
			return null;
		}，
		set：function（elem）{
			var parent = elem.parentNode;
			if（parent）{
				parent.selectedIndex;

				if（parent.parentNode）{
					parent.parentNode.selectedIndex;
				}
			}
		}
	};
}

jQuery.each（[
	“的tabIndex”
	“只读”，
	“最长长度”，
	“CELLSPACING”
	“CELLPADDING”
	“行跨度”，
	“合并单元格”，
	“USEMAP”
	“框架边框”，
	“CONTENTEDITABLE”
]，function（）{
	jQuery.propFix [this.toLowerCase（）] = this;
}）;

// IE6 / 7调用enctype编码
if（！support.enctype）{
	jQuery.propFix.enctype =“encoding”;
}




var rclass = / [\ t \ r \ n \ f] / g;

function getClass（elem）{
	返回jQuery.attr（elem，“class”）|| “”;
}

jQuery.fn.extend（{
	addClass：function（value）{
		var classes，elem，cur，curValue，clazz，j，finalValue，
			i = 0;

		if（jQuery.isFunction（value））{
			return this.each（function（j）{
				jQuery（this）.addClass（value.call（this，j，getClass（this）））;
			}）;
		}

		if（typeof value ===“string”&& value）{
			classes = value.match（rnotwhite）|| [];

			while（（elem = this [i ++]））{
				curValue = getClass（elem）;
				cur = elem.nodeType === 1 &&
					（“”+ curValue +“”）。replace（rclass，“”）;

				if（cur）{
					j = 0;
					while（（clazz = classes [j ++]））{
						if（cur.indexOf（“”+ clazz +“”）<0）{
							cur + = clazz +“”;
						}
					}

					//仅指定不同以避免不必要的渲染。
					finalValue = jQuery.trim（cur）;
					if（curValue！== finalValue）{
						jQuery.attr（elem，“class”，finalValue）;
					}
				}
			}
		}

		归还这个;
	}，

	removeClass：function（value）{
		var classes，elem，cur，curValue，clazz，j，finalValue，
			i = 0;

		if（jQuery.isFunction（value））{
			return this.each（function（j）{
				jQuery（this）.removeClass（value.call（this，j，getClass（this）））;
			}）;
		}

		if（！arguments.length）{
			return this.attr（“class”，“”）;
		}

		if（typeof value ===“string”&& value）{
			classes = value.match（rnotwhite）|| [];

			while（（elem = this [i ++]））{
				curValue = getClass（elem）;

				//此表达式用于提高压缩性（请参阅addClass）
				cur = elem.nodeType === 1 &&
					（“”+ curValue +“”）。replace（rclass，“”）;

				if（cur）{
					j = 0;
					while（（clazz = classes [j ++]））{

						//删除所有*实例
						while（cur.indexOf（“”+ clazz +“”）> -1）{
							cur = cur.replace（“”+ clazz +“”，“”）;
						}
					}

					//仅指定不同以避免不必要的渲染。
					finalValue = jQuery.trim（cur）;
					if（curValue！== finalValue）{
						jQuery.attr（elem，“class”，finalValue）;
					}
				}
			}
		}

		归还这个;
	}，

	toggleClass：function（value，stateVal）{
		var type = typeof value;

		if（typeof stateVal ===“boolean”&& type ===“string”）{
			return stateVal？this.addClass（value）：this.removeClass（value）;
		}

		if（jQuery.isFunction（value））{
			return this.each（function（i）{
				jQuery（this）.toggleClass（
					value.call（this，i，getClass（this），stateVal），
					stateVal
				）;
			}）;
		}

		return this.each（function（）{
			var className，i，self，classNames;

			if（type ===“string”）{

				//切换单个类名
				i = 0;
				self = jQuery（this）;
				classNames = value.match（rnotwhite）|| [];

				while（（className = classNames [i ++]））{

					//检查给定的每个className，空格分隔列表
					if（self.hasClass（className））{
						self.removeClass（className）;
					} else {
						self.addClass（className）;
					}
				}

			//切换整个班级名称
			} else if（value === undefined || type ===“boolean”）{
				className = getClass（this）;
				if（className）{

					//如果设置了store className
					jQuery._data（this，“__ className__”，className）;
				}

				//如果元素有一个类名，或者我们传递了“false”，
				//然后删除整个类名（如果有的话，上面保存了它）。
				//否则带回以前保存过的东西（如果有的话），
				//如果没有存储，则回退到空字符串。
				jQuery.attr（this，“class”，
					className || 值===假？
					“”：
					jQuery._data（this，“__ className__”）|| “”
				）;
			}
		}）;
	}，

	hasClass：function（selector）{
		var className，elem，
			i = 0;

		className =“”+ selector +“”;
		while（（elem = this [i ++]））{
			if（elem.nodeType === 1 &&
				（“”+ getClass（elem）+“”）。replace（rclass，“”）
					.indexOf（className）> -1
			）{
				返回true;
			}
		}

		返回false;
	}
}）;




//返回jQuery以仅包含属性


jQuery.each（（“blur focus focusin focusout load resize scroll unload click dblclick”+
	“mousedown mouseup mousemove mouseover mouseout mouseenter mouseleave”+
	“更改选择提交keydown keypress keyup错误contextmenu”）。split（“”），
	function（i，name）{

	//处理事件绑定
	jQuery.fn [name] = function（data，fn）{
		return arguments.length> 0？
			this.on（name，null，data，fn）：
			this.trigger（名字）;
	};
}）;

jQuery.fn.extend（{
	hover：function（fnOver，fnOut）{
		return this.mouseenter（fnOver）.mouseleave（fnOut || fnOver）;
	}
}）;


var location = window.location;

var nonce = jQuery.now（）;

var rquery =（/ \？/）;



var rvalidtokens = /（，）|（\ [| {）|（} |]）|“（？：[^”\\\ r \ n] | \\ [“\\\ / bfnrt] | \\ u [\ DA-FA-F] {4}）*“\ S *：？|真|假|空|  - （？0 \ d）\ d +（：？？\ \ d + |）（： EE] [+  - ] \ d + |）/克？;

jQuery.parseJSON = function（data）{

	//首先尝试使用本机JSON解析器进行解析
	if（window.JSON && window.JSON.parse）{

		//支持：Android 2.3
		//解决方法无法对字符串转换空输入
		return window.JSON.parse（data +“”）;
	}

	var requireNonComma，
		depth = null，
		str = jQuery.trim（data +“”）;

	//通过确保不遗留任何内容来防范无效（可能是危险的）输入
	//删除有效令牌后
	return str &&！jQuery.trim（str.replace（rvalidtokens，function（token，逗号，open，close）{

		//如果我们看到错误的逗号，强制终止
		if（requireNonComma &&逗号）{
			depth = 0;
		}

		//返回最深处后不再执行替换
		if（depth === 0）{
			返回令牌;
		}

		//逗号不得跟随“[”，“{”或“，”
		requireNonComma = open || 逗号;

		//确定新的深度
		// array / object open（“[”或“{”）：depth + = true  -  false（increment）
		// array / object close（“]”或“}”）：depth + = false  -  true（减量）
		//其他情况（“，”或原始）：depth + = true  -  true（数字强制转换）
		深度+ =！关闭 - ！打开;

		//删除此令牌
		返回“”;
	}））？
		（功能（“返回”+ str））（）：
		jQuery.error（“无效的JSON：”+数据）;
};


//跨浏览器xml解析
jQuery.parseXML = function（data）{
	var xml，tmp;
	if（！data || typeof data！==“string”）{
		return null;
	}
	尝试{
		if（window.DOMParser）{//标准
			tmp = new window.DOMParser（）;
			xml = tmp.parseFromString（data，“text / xml”）;
		} else {// IE
			xml = new window.ActiveXObject（“Microsoft.XMLDOM”）;
			xml.async =“false”;
			xml.loadXML（data）;
		}
	} catch（e）{
		xml =未定义;
	}
	if（！xml ||！xml.documentElement || xml.getElementsByTagName（“parsererror”）。length）{
		jQuery.error（“无效的XML：”+数据）;
	}
	return xml;
};


VAR
	rhash = /#.*$/,
	rts = /（[？＆]）_ = [^＆] * /，

	// IE在EOL中留下\ r \ n字符
	rheaders = / ^（。*？）：[\ t] *（[^ \ r \ n] *）\ r？$ / mg，

	//＃7653，＃8125，＃8152：本地协议检测
	rlocalProtocol = /^(?:about|app|app-storage|.+-extension|file|res | widget）：$ /，
	rnoContent = / ^（？：GET | HEAD）$ /，
	rprotocol = / ^ \ / \ //，
	rurl = / ^（[\ w。+  - ] + :)（？：\ / \ /（？：[^ \ /？＃] * @ |）（[^ \ /？＃：] *）（？： ：（\ d +）|）|）/，

	/ *预过滤器
	 * 1）它们对于引入自定义数据类型很有用（有关示例，请参阅ajax / jsonp.js）
	 * 2）这些被称为：
	 *  - 在要求运输之前
	 *  - 参数序列化后（如果s.processData为true，则s.data为字符串）
	 * 3）key是dataType
	 * 4）可以使用catchall符号“*”
	 * 5）执行将以transport dataType开始，然后如果需要则继续向下“*”
	 * /
	prefilters = {}，

	/ *传输绑定
	 * 1）key是dataType
	 * 2）可以使用catchall符号“*”
	 * 3）选择将以transport dataType开始，然后如果需要则转到“*”
	 * /
	transports = {}，

	//避免使用comment-prolog char序列（＃10098）; 必须安抚棉绒并逃避压迫
	allTypes =“* /”。concat（“*”），

	//文档位置
	ajaxLocation = location.href，

	//将位置划分为多个部分
	ajaxLocParts = rurl.exec（ajaxLocation.toLowerCase（））|| [];

// jQuery.ajaxPrefilter和jQuery.ajaxTransport的基础“构造函数”
function addToPrefiltersOrTransports（structure）{

	// dataTypeExpression是可选的，默认为“*”
	return函数（dataTypeExpression，func）{

		if（typeof dataTypeExpression！==“string”）{
			func = dataTypeExpression;
			dataTypeExpression =“*”;
		}

		var dataType，
			i = 0，
			dataTypes = dataTypeExpression.toLowerCase（）。match（rnotwhite）|| [];

		if（jQuery.isFunction（func））{

			//对于dataTypeExpression中的每个dataType
			while（（dataType = dataTypes [i ++]））{

				//如果请求前置
				if（dataType.charAt（0）===“+”）{
					dataType = dataType.slice（1）|| “*”;
					（structure [dataType] = structure [dataType] || []）。unshift（func）;

				//否则追加
				} else {
					（structure [dataType] = structure [dataType] || []）。push（func）;
				}
			}
		}
	};
}

//预滤器和运输的基本检查功能
function inspectPrefiltersOrTransports（structure，options，originalOptions，jqXHR）{

	var检查= {}，
		seekingTransport =（结构===运输）;

	function inspect（dataType）{
		var selected;
		检查[dataType] = true;
		jQuery.each（structure [dataType] || []，function（_，prefilterOrFactory）{
			var dataTypeOrTransport = prefilterOrFactory（options，originalOptions，jqXHR）;
			if（typeof dataTypeOrTransport ===“string”&&
				！seekingTransport &&！inspected [dataTypeOrTransport]）{

				options.dataTypes.unshift（dataTypeOrTransport）;
				inspect（dataTypeOrTransport）;
				返回false;
			} else if（seekingTransport）{
				return！（selected = dataTypeOrTransport）;
			}
		}）;
		返回选中;
	}

	return inspect（options.dataTypes [0]）|| ！检查[“*”] && inspect（“*”）;
}

// ajax选项的特殊扩展
//采取“平坦”选项（不要深度扩展）
//修复＃9887
function ajaxExtend（target，src）{
	var deep，key，
		flatOptions = jQuery.ajaxSettings.flatOptions || {};

	for（key in src）{
		if（src [key]！== undefined）{
			（flatOptions [key]？target :( deep ||（deep = {}）））[key] = src [key];
		}
	}
	if（deep）{
		jQuery.extend（true，target，deep）;
	}

	回归目标;
}

/ *处理对ajax请求的响应：
 *  - 找到正确的dataType（介于内容类型和预期的dataType之间）
 *  - 返回相应的响应
 * /
function ajaxHandleResponses（s，jqXHR，responses）{
	var firstDataType，ct，finalDataType，type，
		contents = s.contents，
		dataTypes = s.dataTypes;

	//删除auto dataType并在流程中获取内容类型
	while（dataTypes [0] ===“*”）{
		dataTypes.shift（）;
		if（ct === undefined）{
			ct = s.mimeType || jqXHR.getResponseHeader（“Content-Type”）;
		}
	}

	//检查我们是否正在处理已知的内容类型
	if（ct）{
		for（输入内容）{
			if（contents [type] && contents [type] .test（ct））{
				dataTypes.unshift（type）;
				打破;
			}
		}
	}

	//检查我们是否对预期的dataType有响应
	if（响应中的dataTypes [0]）{
		finalDataType = dataTypes [0];
	} else {

		//尝试convertible dataTypes
		for（输入回复）{
			if（！dataTypes [0] || s.converters [type +“”+ dataTypes [0]]）{
				finalDataType = type;
				打破;
			}
			if（！firstDataType）{
				firstDataType = type;
			}
		}

		//或者只是使用第一个
		finalDataType = finalDataType || firstDataType;
	}

	//如果我们找到了dataType
	//如果需要，我们将dataType添加到列表中
	//并返回相应的响应
	if（finalDataType）{
		if（finalDataType！== dataTypes [0]）{
			dataTypes.unshift（finalDataType）;
		}
		返回响应[finalDataType];
	}
}

/ *给出请求和原始响应的链转换
 *还设置jqXHR实例上的responseXXX字段
 * /
function ajaxConvert（s，response，jqXHR，isSuccess）{
	var conv2，current，conv，tmp，prev，
		converters = {}，

		//使用dataTypes的副本，以防我们需要修改它以进行转换
		dataTypes = s.dataTypes.slice（）;

	//使用小写键创建转换器映射
	if（dataTypes [1]）{
		for（conv in s.converters）{
			converter [conv.toLowerCase（）] = s.converters [conv];
		}
	}

	current = dataTypes.shift（）;

	//转换为每个顺序数据类型
	而（当前）{

		if（s.responseFields [current]）{
			jqXHR [s.responseFields [current]] =响应;
		}

		//如果提供，请应用dataFilter
		if（！prev && isSuccess && s.dataFilter）{
			response = s.dataFilter（response，s.dataType）;
		}

		prev =当前;
		current = dataTypes.shift（）;

		if（current）{

			//如果当前的dataType是非自动的，那么只有工作要做
			if（current ===“*”）{

				current = prev;

			//如果prev dataType为非auto且与当前不同，则转换响应
			} else if（prev！==“*”&& prev！== current）{

				//寻求直接转换器
				conv = converter [prev +“”+ current] || converter [“*”+ current];

				//如果没有找到，请寻找一对
				if（！conv）{
					for（转换器中的conv2）{

						//如果conv2输出电流
						tmp = conv2.split（“”）;
						if（tmp [1] === current）{

							//如果prev可以转换为接受的输入
							conv = converter [prev +“”+ tmp [0]] ||
								converter [“*”+ tmp [0]];
							if（conv）{

								//压缩等价转换器
								if（conv === true）{
									conv = converters [conv2];

								//否则，插入中间数据类型
								} else if（converters [conv2]！== true）{
									current = tmp [0];
									dataTypes.unshift（tmp [1]）;
								}
								打破;
							}
						}
					}
				}

				//应用转换器（如果不是等价）
				if（conv！== true）{

					//除非允许错误冒泡，否则捕获并返回它们
					if（conv && s [“throws”]）{// jscs：ignore requireDotNotation
						response = conv（响应）;
					} else {
						尝试{
							response = conv（响应）;
						} catch（e）{
							返回{
								州：“parsererror”，
								错误：转换？e：“没有从”+ prev +“转换为”+ current“
							};
						}
					}
				}
			}
		}
	}

	return {state：“success”，data：response};
}

jQuery.extend（{

	//用于保存活动查询数的计数器
	有效：0，

	//下次请求的Last-Modified标头缓存
	最后修改： {}，
	etag：{}，

	ajaxSettings：{
		url：ajaxLocation，
		类型：“GET”，
		isLocal：rlocalProtocol.test（ajaxLocParts [1]），
		全球：真的，
		processData：true，
		异步：是的，
		contentType：“application / x-www-form-urlencoded; charset = UTF-8”，
		/ *
		超时：0，
		数据：null，
		dataType：null，
		用户名：null，
		密码：null，
		cache：null，
		抛出：假，
		传统的：假的，
		标题：{}，
		* /

		接受：{
			“*“： 所有类型，
			文字：“text / plain”，
			html：“text / html”，
			xml：“application / xml，text / xml”，
			json：“application / json，text / javascript”
		}，

		内容：{
			xml：/ \ bxml \ b /，
			html：/ \ bhtml /，
			json：/ \ bjson \ b /
		}，

		responseFields：{
			xml：“responseXML”，
			text：“responseText”，
			json：“responseJSON”
		}，

		//数据转换器
		//使用单个空格键分隔源（或catchall“*”）和目标类型
		转换器：{

			//将任何内容转换为文本
			“* text”：字符串，

			//文本到html（true =无转换）
			“text html”：是的，

			//将文本评估为json表达式
			“text json”：jQuery.parseJSON，

			//将文本解析为xml
			“text xml”：jQuery.parseXML
		}，

		//对于不应深度扩展的选项：
		//如果你可以在这里添加自己的自定义选项
		//当你创建一个不应该的
		//深度扩展（参见ajaxExtend）
		flatOptions：{
			url：是的，
			上下文：是的
		}
	}，

	//将完整的成熟设置对象创建到目标中
	//同时包含ajaxSettings和设置字段。
	//如果省略target，则写入ajaxSettings。
	ajaxSetup：function（target，settings）{
		返回设置？

			//构建设置对象
			ajaxExtend（ajaxExtend（target，jQuery.ajaxSettings），settings）：

			//扩展ajaxSettings
			ajaxExtend（jQuery.ajaxSettings，target）;
	}，

	ajaxPrefilter：addToPrefiltersOrTransports（prefilters），
	ajaxTransport：addToPrefiltersOrTransports（transports），

	//主要方法
	ajax：function（url，options）{

		//如果url是一个对象，则模拟1.5之前的签名
		if（typeof url ===“object”）{
			options = url;
			url = undefined;
		}

		//强制选项成为对象
		options = options || {};

		VAR

			//跨域检测变量
			部分，

			//循环变量
			一世，

			//没有反缓存参数的URL
			cacheURL，

			//响应标头为字符串
			responseHeadersString，

			//超时句柄
			timeoutTimer，

			//知道是否要调度全局事件
			fireGlobals，

			运输，

			//响应标头
			responseHeaders响应，

			//创建最终选项对象
			s = jQuery.ajaxSetup（{}，options），

			//回调上下文
			callbackContext = s.context || S，

			//全局事件的上下文是callbackContext，如果它是DOM节点或jQuery集合
			globalEventContext = s.context &&
				（callbackContext.nodeType || callbackContext.jquery）？
					jQuery（callbackContext）：
					jQuery.event，

			//延期
			deferred = jQuery.Deferred（），
			completeDeferred = jQuery.Callbacks（“一次内存”），

			//依赖于状态的回调
			statusCode = s.statusCode || {}，

			//标题（它们一次性发送）
			requestHeaders = {}，
			requestHeadersNames = {}，

			// jqXHR状态
			state = 0，

			//默认中止消息
			strAbort =“已取消”，

			//假xhr
			jqXHR = {
				readyState：0，

				//如果需要，构建头哈希表
				getResponseHeader：function（key）{
					var匹配;
					if（state === 2）{
						if（！responseHeaders）{
							responseHeaders = {};
							while（（match = rheaders.exec（responseHeadersString）））{
								responseHeaders [match [1] .toLowerCase（）] = match [2];
							}
						}
						match = responseHeaders [key.toLowerCase（）];
					}
					return match == null？null：匹配;
				}，

				//原始字符串
				getAllResponseHeaders：function（）{
					返回状态=== 2？responseHeadersString：null;
				}，

				//缓存标题
				setRequestHeader：function（name，value）{
					var lname = name.toLowerCase（）;
					if（！state）{
						name = requestHeadersNames [lname] = requestHeadersNames [lname] || 名称;
						requestHeaders [name] = value;
					}
					归还这个;
				}，

				//覆盖响应内容类型标头
				overrideMimeType：function（type）{
					if（！state）{
						s.mimeType = type;
					}
					归还这个;
				}，

				//依赖于状态的回调
				statusCode：function（map）{
					var代码;
					if（map）{
						if（state <2）{
							for（地图中的代码）{

								//以一种保留旧回调的方式延迟添加新回调
								statusCode [code] = [statusCode [code]，map [code]];
							}
						} else {

							//执行适当的回调
							jqXHR.always（map [jqXHR.status]）;
						}
					}
					归还这个;
				}，

				//取消请求
				abort：function（statusText）{
					var finalText = statusText || strAbort;
					if（transport）{
						transport.abort（finalText）;
					}
					完成（0，finalText）;
					归还这个;
				}
			};

		//附加延迟
		deferred.promise（jqXHR）.complete = completeDeferred.add;
		jqXHR.success = jqXHR.done;
		jqXHR.error = jqXHR.fail;

		//删除哈希字符（＃7531：和字符串提升）
		//如果未提供协议，则添加协议（＃5866：无协议URL的IE7问题）
		//在设置对象中处理错误的URL（＃10093：与旧签名的一致性）
		//我们还使用url参数（如果可用）
		s.url =（（url || s.url || ajaxLocation）+“”）
			.replace（rhash，“”）
			.replace（rprotocol，ajaxLocParts [1] +“//”）;

		//根据票证＃12004键入的别名方法选项
		s.type = options.method || options.type || s.method || s.type;

		//提取dataTypes列表
		s.dataTypes = jQuery.trim（s.dataType ||“*”）。toLowerCase（）。match（rnotwhite）|| [“”];

		//当我们有一个协议时，跨域请求是有序的：host：port mismatch
		if（s.crossDomain == null）{
			parts = rurl.exec（s.url.toLowerCase（））;
			s.crossDomain = !!（parts &&
				（parts [1]！== ajaxLocParts [1] || parts [2]！== ajaxLocParts [2] ||
					（部分[3] ||（部分[1] ===“http：”？“”80“：”443“））！==
						（ajaxLocParts [3] ||（ajaxLocParts [1] ===“http：”？“”80“：”443“）））
			）;
		}

		//转换数据（如果还不是字符串）
		if（s.data && s.processData && typeof s.data！==“string”）{
			s.data = jQuery.param（s.data，s.traditional）;
		}

		//应用预过滤器
		inspectPrefiltersOrTransports（prefilters，s，options，jqXHR）;

		//如果请求在预过滤器内中止，请停在那里
		if（state === 2）{
			返回jqXHR;
		}

		//如果被要求，我们现在可以发起全球事件
		//如果在AMD使用场景中未定义jQuery.event，请不要触发事件（＃15118）
		fireGlobals = jQuery.event && s.global;

		//观察一组新的请求
		if（fireGlobals && jQuery.active ++ === 0）{
			jQuery.event.trigger（“ajaxStart”）;
		}

		//大写类型
		s.type = s.type.toUpperCase（）;

		//确定请求是否包含内容
		s.hasContent =！rnoContent.test（s.type）;

		//保存URL，以防我们使用If-Modified-Since进行操作
		//和/或If-None-Match标题稍后
		cacheURL = s.url;

		//更多选项处理没有内容的请求
		if（！s.hasContent）{

			//如果数据可用，请将数据附加到url
			if（s.data）{
				cacheURL =（s.url + =（rquery.test（cacheURL）？“＆”：“？”）+ s.data）;

				//＃9682：删除数据，以便在最终重试时不使用它
				删除s.data;
			}

			//如果需要，在URL中添加反缓存
			if（s.cache === false）{
				s.url = rts.test（cacheURL）？

					//如果已有'_'参数，请设置其值
					cacheURL.replace（rts，“$ 1_ =”+ nonce ++）：

					//否则添加一个到最后
					cacheURL +（rquery.test（cacheURL）？“＆”：“？”）+“_ =”+ nonce ++;
			}
		}

		//如果处于ifModified模式，则设置If-Modified-Since和/或If-None-Match标头。
		if（s.ifModified）{
			if（jQuery.lastModified [cacheURL]）{
				jqXHR.setRequestHeader（“If-Modified-Since”，jQuery.lastModified [cacheURL]）;
			}
			if（jQuery.etag [cacheURL]）{
				jqXHR.setRequestHeader（“If-None-Match”，jQuery.etag [cacheURL]）;
			}
		}

		//如果正在发送数据，请设置正确的标头
		if（s.data && s.hasContent && s.contentType！== false || options.contentType）{
			jqXHR.setRequestHeader（“Content-Type”，s.contentType）;
		}

		//根据dataType设置服务器的Accepts标头
		jqXHR.setRequestHeader（
			“接受”，
			s.dataTypes [0] && s.accepts [s.dataTypes [0]]？
				s.accepts [s.dataTypes [0]] +
					（s.dataTypes [0]！==“*”？“，”+ allTypes +“; q = 0.01”：“”）：
				s.accepts [“*”]
		）;

		//检查标题选项
		for（i in s.headers）{
			jqXHR.setRequestHeader（i，s.headers [i]）;
		}

		//允许自定义标头/ mimetypes并提前中止
		if（s.beforeSend &&
			（s.beforeSend.call（callbackContext，jqXHR，s）=== false || state === 2））{

			//如果没有完成则中止并返回
			return jqXHR.abort（）;
		}

		//中止不再是取消
		strAbort =“abort”;

		//在延迟上安装回调
		for（i in {success：1，error：1，complete：1}）{
			jqXHR [i]（s [i]）;
		}

		//获取运输
		transport = inspectPrefiltersOrTransports（transports，s，options，jqXHR）;

		//如果没有运输，我们自动中止
		if（！transport）{
			完成（-1，“无运输”）;
		} else {
			jqXHR.readyState = 1;

			//发送全局事件
			if（fireGlobals）{
				globalEventContext.trigger（“ajaxSend”，[jqXHR，s]）;
			}

			//如果请求在ajaxSend中被中止，请停在那里
			if（state === 2）{
				返回jqXHR;
			}

			// 超时
			if（s.async && s.timeout> 0）{
				timeoutTimer = window.setTimeout（function（）{
					jqXHR.abort（“timeout”）;
				}，s.timeout）;
			}

			尝试{
				state = 1;
				transport.send（requestHeaders，done）;
			} catch（e）{

				//如果没有完成，则将异常传播为错误
				if（state <2）{
					完成（-1，e）;

				//简单地重新抛出
				} else {
					扔掉;
				}
			}
		}

		//完成所有操作后回调
		功能完成（状态，nativeStatusText，响应，标题）{
			var isSuccess，成功，错误，响应，修改，
				statusText = nativeStatusText;

			//叫一次
			if（state === 2）{
				返回;
			}

			//状态现在已“完成”
			state = 2;

			//如果存在则清除超时
			if（timeoutTimer）{
				window.clearTimeout（timeoutTimer）;
			}

			//用于早期垃圾收集的取消引用传输
			//（无论jqXHR对象使用多长时间）
			transport = undefined;

			//缓存响应头
			responseHeadersString = headers || “”;

			//设置readyState
			jqXHR.readyState = status> 0？4：0;

			//确定是否成功
			isSuccess = status> = 200 && status <300 || 状态=== 304;

			//获取响应数据
			if（回复）{
				response = ajaxHandleResponses（s，jqXHR，response）;
			}

			//转换无论什么（总是设置responseXXX字段）
			response = ajaxConvert（s，response，jqXHR，isSuccess）;

			//如果成功，请处理类型链接
			if（isSuccess）{

				//如果处于ifModified模式，则设置If-Modified-Since和/或If-None-Match标头。
				if（s.ifModified）{
					modified = jqXHR.getResponseHeader（“Last-Modified”）;
					if（modified）{
						jQuery.lastModified [cacheURL] = modified;
					}
					modified = jqXHR.getResponseHeader（“etag”）;
					if（modified）{
						jQuery.etag [cacheURL] =已修改;
					}
				}

				//如果没有内容
				if（status === 204 || s.type ===“HEAD”）{
					statusText =“nocontent”;

				//如果没有修改
				} else if（status === 304）{
					statusText =“notmodified”;

				//如果我们有数据，让我们转换它
				} else {
					statusText = response.state;
					success = response.data;
					error = response.error;
					isSuccess =！error;
				}
			} else {

				//我们从statusText中提取错误
				//然后规范化非中止的statusText和status
				error = statusText;
				if（status ||！statusText）{
					statusText =“错误”;
					if（status <0）{
						status = 0;
					}
				}
			}

			//设置假xhr对象的数据
			jqXHR.status = status;
			jqXHR.statusText =（nativeStatusText || statusText）+“”;

			//成功/错误
			if（isSuccess）{
				deferred.resolveWith（callbackContext，[success，statusText，jqXHR]）;
			} else {
				deferred.rejectWith（callbackContext，[jqXHR，statusText，error]）;
			}

			//依赖于状态的回调
			jqXHR.statusCode（statusCode）;
			statusCode = undefined;

			if（fireGlobals）{
				globalEventContext.trigger（isSuccess？“ajaxSuccess”：“ajaxError”，
					[jqXHR，s，是成功吗？成功：错误]）;
			}

			//完成
			completeDeferred.fireWith（callbackContext，[jqXHR，statusText]）;

			if（fireGlobals）{
				globalEventContext.trigger（“ajaxComplete”，[jqXHR，s]）;

				//处理全局AJAX计数器
				if（！（ -  jQuery.active））{
					jQuery.event.trigger（“ajaxStop”）;
				}
			}
		}

		返回jqXHR;
	}，

	getJSON：function（url，data，callback）{
		return jQuery.get（url，data，callback，“json”）;
	}，

	getScript：function（url，callback）{
		return jQuery.get（url，undefined，callback，“script”）;
	}
}）;

jQuery.each（[“get”，“post”]，function（i，method）{
	jQuery [method] = function（url，data，callback，type）{

		//如果省略data参数，则移位参数
		if（jQuery.isFunction（data））{
			type = type || 打回来;
			callback = data;
			data = undefined;
		}

		// url可以是一个options对象（然后必须有.url）
		return jQuery.ajax（jQuery.extend（{
			url：url，
			类型：方法，
			dataType：type，
			数据：数据，
			成功：回调
		}，jQuery.isPlainObject（url）&& url））;
	};
}）;


jQuery._evalUrl = function（url）{
	return jQuery.ajax（{
		url：url，

		//明确这一点，因为用户可以通过ajaxSetup覆盖它（＃11264）
		类型：“GET”，
		dataType：“script”，
		cache：true，
		async：false，
		全球：假，
		“抛出”：是的
	}）;
};


jQuery.fn.extend（{
	wrapAll：function（html）{
		if（jQuery.isFunction（html））{
			return this.each（function（i）{
				jQuery（this）.wrapAll（html.call（this，i））;
			}）;
		}

		if（this [0]）{

			//包围目标的元素
			var wrap = jQuery（html，this [0] .ownerDocument）.eq（0）.clone（true）;

			if（this [0] .parentNode）{
				wrap.insertBefore（this [0]）;
			}

			wrap.map（function（）{
				var elem = this;

				while（elem.firstChild && elem.firstChild.nodeType === 1）{
					elem = elem.firstChild;
				}

				返回元素;
			}）.append（this）;
		}

		归还这个;
	}，

	wrapInner：function（html）{
		if（jQuery.isFunction（html））{
			return this.each（function（i）{
				jQuery（this）.wrapInner（html.call（this，i））;
			}）;
		}

		return this.each（function（）{
			var self = jQuery（this），
				contents = self.contents（）;

			if（contents.length）{
				contents.wrapAll（html）;

			} else {
				self.append（html）;
			}
		}）;
	}，

	wrap：function（html）{
		var isFunction = jQuery.isFunction（html）;

		return this.each（function（i）{
			jQuery（this）.wrapAll（isFunction？html.call（this，i）：html）;
		}）;
	}，

	unwrap：function（）{
		返回this.parent（）。each（function（）{
			if（！jQuery.nodeName（this，“body”））{
				jQuery（this）.replaceWith（this.childNodes）;
			}
		} ）。结束（）;
	}
}）;


function getDisplay（elem）{
	return elem.style && elem.style.display || jQuery.css（elem，“display”）;
}

function filterHidden（elem）{

	//断开连接的元素被视为隐藏
	if（！jQuery.contains（elem.ownerDocument || document，elem））{
		返回true;
	}
	while（elem && elem.nodeType === 1）{
		if（getDisplay（elem）===“none”|| elem.type ===“hidden”）{
			返回true;
		}
		elem = elem.parentNode;
	}
	返回false;
}

jQuery.expr.filters.hidden = function（elem）{

	//支持：Opera <= 12.12
	// Opera在某些元素上报告offsetWidths和offsetHeights小于零
	return support.reliableHiddenOffsets（）？
		（elem.offsetWidth <= 0 && elem.offsetHeight <= 0 &&
			！elem.getClientRects（）。length）：
			filterHidden（elem）;
};

jQuery.expr.filters.visible = function（elem）{
	return！jQuery.expr.filters.hidden（elem）;
};




var r20 = /％20 / g，
	rbracket = / \ [\] $ /，
	rCRLF = / \ r？\ n / g，
	rsubmitterTypes = / ^（？：submit | button | image | reset | file）$ / i，
	rsubmittable = / ^（？：input | select | textarea | keygen）/ i;

function buildParams（prefix，obj，traditional，add）{
	var name;

	if（jQuery.isArray（obj））{

		//序列化数组项。
		jQuery.each（obj，function（i，v）{
			if（traditional || rbracket.test（prefix））{

				//将每个数组项视为标量。
				add（prefix，v）;

			} else {

				// Item是非标量（数组或对象），编码其数字索引。
				buildParams（
					前缀+“[”+（typeof v ===“object”&& v！= null？i：“”）+“]”，
					五，
					传统的，
					加
				）;
			}
		}）;

	} else if（！traditional && jQuery.type（obj）===“object”）{

		//序列化对象项。
		for（obj中的名字）{
			buildParams（前缀+“[”+ name +“]”，obj [name]，繁体，添加）;
		}

	} else {

		//序列化标量项。
		add（prefix，obj）;
	}
}

//序列化一个表单元素数组或一组表单元素
//键/值到查询字符串中
jQuery.param = function（a，traditional）{
	var前缀，
		s = []，
		add = function（key，value）{

			//如果value是一个函数，则调用它并返回其值
			value = jQuery.isFunction（value）？value（）:( value == null？“”：value）;
			s [s.length] = encodeURIComponent（key）+“=”+ encodeURIComponent（value）;
		};

	//将jQuery <= 1.3.2行为的传统设置为true。
	if（传统=== undefined）{
		traditional = jQuery.ajaxSettings && jQuery.ajaxSettings.traditional;
	}

	//如果传入了一个数组，则假定它是一个表单元素数组。
	if（jQuery.isArray（a）||（a.jquery &&！jQuery.isPlainObject（a）））{

		//序列化表单元素
		jQuery.each（a，function（）{
			add（this.name，this.value）;
		}）;

	} else {

		//如果是传统方式，则编码“旧”方式（1.3.2或更旧的方式）
		//做了它，否则递归编码params。
		for（a中的前缀）{
			buildParams（前缀，[前缀]，繁体，添加）;
		}
	}

	//返回结果序列化
	return s.join（“＆”）.replace（r20，“+”）;
};

jQuery.fn.extend（{
	serialize：function（）{
		return jQuery.param（this.serializeArray（））;
	}，
	serializeArray：function（）{
		return this.map（function（）{

			//可以为“元素”添加propHook来过滤或添加表单元素
			var elements = jQuery.prop（this，“elements”）;
			返回元素？jQuery.makeArray（elements）：this;
		}）
		.filter（function（）{
			var type = this.type;

			//使用.is（“：disabled”）以便fieldset [disabled]起作用
			return this.name &&！jQuery（this）.is（“：disabled”）&&
				rsubmittable.test（this.nodeName）&&！rsubmitterTypes.test（type）&&
				（this.checked ||！rcheckableType.test（type））;
		}）
		.map（function（i，elem）{
			var val = jQuery（this）.val（）;

			return val == null？
				空值 ：
				jQuery.isArray（val）？
					jQuery.map（val，function（val）{
						return {name：elem.name，value：val.replace（rCRLF，“\ r \ n”）};
					}）：
					{name：elem.name，value：val.replace（rCRLF，“\ r \ n”）};
		}）.get（）;
	}
}）;


//创建请求对象
//（为了向后兼容，这仍然附加到ajaxSettings）
jQuery.ajaxSettings.xhr = window.ActiveXObject！== undefined？

	//支持：IE6-IE8
	function（）{

		// XHR无法访问本地文件，在这种情况下始终使用ActiveX
		if（this.isLocal）{
			return createActiveXHR（）;
		}

		//支持：IE 9-11
		//当ActiveX XHR时，IE似乎在跨域PATCH请求上出错
		// 用来。在IE 9+中始终使用本机XHR。
		//注意：此条件不会捕获Edge，因为它没有定义
		// document.documentMode但它也不支持ActiveX，所以它不会
		//达到此代码。
		if（document.documentMode> 8）{
			return createStandardXHR（）;
		}

		//支持：IE <9
		// oldIE XHR不支持非RFC2616方法（＃13240）
		//请参阅http://msdn.microsoft.com/en-us/library/ie/ms536648(v=vs.85).aspx
		//和http://www.w3.org/Protocols/rfc2616/rfc2616-sec9.html#sec9
		//虽然检查了六种方法而不是八种方法
		//因为IE也不支持“trace”和“connect”
		return / ^（get | post | head | put | delete | options）$ / i.test（this.type）&&
			createStandardXHR（）|| createActiveXHR（）;
	}：

	//对于所有其他浏览器，请使用标准XMLHttpRequest对象
	createStandardXHR;

var xhrId = 0，
	xhrCallbacks = {}，
	xhrSupported = jQuery.ajaxSettings.xhr（）;

//支持：IE <10
//卸载时必须手动中止打开请求（＃5280）
//有关详细信息，请参阅https://support.microsoft.com/kb/2856746
if（window.attachEvent）{
	window.attachEvent（“onunload”，function（）{
		for（xhrCallbacks中的var键）{
			xhrCallbacks [key]（undefined，true）;
		}
	}）;
}

//确定支持属性
support.cors = !! xhrSupported &&（xhrSupported中的“withCredentials”）;
xhrSupported = support.ajax = !! xhrSupported;

//如果浏览器可以提供xhr，则创建传输
if（xhrSupported）{

	jQuery.ajaxTransport（function（options）{

		//只有在通过XMLHttpRequest支持时才允许跨域
		if（！options.crossDomain || support.cors）{

			var回调;

			返回{
				send：function（headers，complete）{
					var i，
						xhr = options.xhr（），
						id = ++ xhrId;

					//打开套接字
					xhr.open（
						options.type，
						options.url，
						options.async，
						options.username，
						options.password
					）;

					//如果提供，则应用自定义字段
					if（options.xhrFields）{
						for（i in options.xhrFields）{
							xhr [i] = options.xhrFields [i];
						}
					}

					//如果需要，覆盖mime类型
					if（options.mimeType && xhr.overrideMimeType）{
						xhr.overrideMimeType（options.mimeType）;
					}

					// X-Requested-With标题
					//对于跨域请求，视为预检的条件
					//类似于拼图游戏，我们根本就没有把它确定下来。
					//（它总是可以基于每个请求设置，甚至可以使用ajaxSetup设置）
					//对于同域请求，如果已经提供，则不会更改标头。
					if（！options.crossDomain &&！headers [“X-Requested-With”]）{
						headers [“X-Requested-With”] =“XMLHttpRequest”;
					}

					//设置标题
					for（i in headers）{

						//支持：IE <9
						// IE的ActiveXObject在设置时抛出“类型不匹配”异常
						//请求标头为空值。
						//
						//为了与其他XHR实现保持一致，请转换值
						//字符串并忽略`undefined`。
						if（headers [i]！== undefined）{
							xhr.setRequestHeader（i，headers [i] +“”）;
						}
					}

					//发送请求
					//这可能引发一个实际的异常
					//在jQuery.ajax中处理（所以没有在这里试试/ catch）
					xhr.send（（options.hasContent && options.data）|| null）;

					//听众
					callback = function（_，isAbort）{
						var status，statusText，response;

						//从未被调用，被中止或完成
						if（callback &&（isAbort || xhr.readyState === 4））{

							// 清理
							删除xhrCallbacks [id];
							callback = undefined;
							xhr.onreadystatechange = jQuery.noop;

							//如果需要，可以手动中止
							if（isAbort）{
								if（xhr.readyState！== 4）{
									xhr.abort（）;
								}
							} else {
								respond = {};
								status = xhr.status;

								//支持：IE <10
								//访问二进制数据responseText会引发异常
								//（＃11426）
								if（typeof xhr.responseText ===“string”）{
									responses.text = xhr.responseText;
								}

								// Firefox访问时抛出异常
								// statusText用于错误的跨域请求
								尝试{
									statusText = xhr.statusText;
								} catch（e）{

									//我们使用Webkit进行规范化，给出一个空状态文本
									statusText =“”;
								}

								//过滤非标准行为的状态

								//如果请求是本地的，我们有数据：假设成功
								//（没有数据的成功将不会得到通知，这是我们最好的
								//可以做当前的实现）
								if（！status && options.isLocal &&！options.crossDomain）{
									status = responses.text？200：404;

								// IE  - ＃1450：当它应该是204时，有时会返回1223
								} else if（status === 1223）{
									status = 204;
								}
							}
						}

						//如果需要，请致电完成
						if（回复）{
							complete（status，statusText，responses，xhr.getAllResponseHeaders（））;
						}
					};

					//发送请求
					//`xhr.send`可能会引发异常，但它会
					//在jQuery.ajax中处理（所以没有在这里试试/ catch）
					if（！options.async）{

						//如果我们处于同步模式，我们会触发回调
						打回来（）;
					} else if（xhr.readyState === 4）{

						//（IE6和IE7）如果它在缓存中并且已经存在
						//直接检索我们需要触发回调
						window.setTimeout（callback）;
					} else {

						//注册回调，但在“xhr.send”抛出的情况下将其延迟
						//添加到活动xhr回调列表
						xhr.onreadystatechange = xhrCallbacks [id] =回调;
					}
				}，

				abort：function（）{
					if（callback）{
						回调（undefined，true）;
					}
				}
			};
		}
	}）;
}

//创建xhrs的函数
function createStandardXHR（）{
	尝试{
		return new window.XMLHttpRequest（）;
	} catch（e）{}
}

function createActiveXHR（）{
	尝试{
		返回新窗口.ActiveXObject（“Microsoft.XMLHTTP”）;
	} catch（e）{}
}




//安装脚本dataType
jQuery.ajaxSetup（{
	接受：{
		脚本：“text / javascript，application / javascript，”+
			“application / ecmascript，application / x-ecmascript”
	}，
	内容：{
		脚本：/ \ b（？：java | ecma）脚本\ b /
	}，
	转换器：{
		“text script”：function（text）{
			jQuery.globalEval（text）;
			返回文字;
		}
	}
}）;

//处理缓存的特殊情况和全局
jQuery.ajaxPrefilter（“script”，function（s）{
	if（s.cache === undefined）{
		s.cache = false;
	}
	if（s.crossDomain）{
		s.type =“GET”;
		s.global = false;
	}
}）;

//绑定脚本标记黑客传输
jQuery.ajaxTransport（“script”，function（s）{

	//此传输仅处理跨域请求
	if（s.crossDomain）{

		var脚本，
			head = document.head || jQuery（“head”）[0] || document.documentElement中;

		返回{

			send：function（_，callback）{

				script = document.createElement（“script”）;

				script.async = true;

				if（s.scriptCharset）{
					script.charset = s.scriptCharset;
				}

				script.src = s.url;

				//为所有浏览器附加处理程序
				script.onload = script.onreadystatechange = function（_，isAbort）{

					if（isAbort ||！script.readyState || / loaded|complete/.test（script.readyState））{

						//处理IE中的内存泄漏
						script.onload = script.onreadystatechange = null;

						//删除脚本
						if（script.parentNode）{
							script.parentNode.removeChild（script）;
						}

						//取消引用脚本
						script = null;

						//如果不是中止则回调
						if（！isAbort）{
							回调（200，“成功”）;
						}
					}
				};

				//通过预先添加来绕过基本元素（＃2709和＃4378）的IE6错误
				//使用原生DOM操作来避免我们的domManip AJAX欺骗
				head.insertBefore（script，head.firstChild）;
			}，

			abort：function（）{
				if（script）{
					script.onload（undefined，true）;
				}
			}
		};
	}
}）;




var oldCallbacks = []，
	rjsonp = /（=）\？（？=＆| $）| \？\？/;

//默认的jsonp设置
jQuery.ajaxSetup（{
	jsonp：“回调”，
	jsonpCallback：function（）{
		var callback = oldCallbacks.pop（）|| （jQuery.expando +“_”+（nonce ++））;
		这[callback] = true;
		返回回调;
	}
}）;

//检测，规范化选项并为jsonp请求安装回调
jQuery.ajaxPrefilter（“json jsonp”，function（s，originalSettings，jqXHR）{

	var callbackName，overwritten，responseContainer，
		jsonProp = s.jsonp！== false &&（rjsonp.test（s.url）？
			“网址”：
			typeof s.data ===“string”&&
				（s.contentType ||“”）
					.indexOf（“application / x-www-form-urlencoded”）=== 0 &&
				rjsonp.test（s.data）&&“data”
		）;

	//如果预期的数据类型是“jsonp”，或者我们有一个要设置的参数，请处理
	if（jsonProp || s.dataTypes [0] ===“jsonp”）{

		//获取回调名称，记住与之关联的预先存在的值
		callbackName = s.jsonpCallback = jQuery.isFunction（s.jsonpCallback）？
			s.jsonpCallback（）：
			s.jsonpCallback;

		//将回调插入到url或表单数据中
		if（jsonProp）{
			s [jsonProp] = s [jsonProp] .replace（rjsonp，“$ 1”+ callbackName）;
		} else if（s.jsonp！== false）{
			s.url + =（rquery.test（s.url）？“＆”：“？”）+ s.jsonp +“=”+ callbackName;
		}

		//在脚本执行后使用数据转换器检索json
		s.converters [“script json”] = function（）{
			if（！responseContainer）{
				jQuery.error（callbackName +“未被调用”）;
			}
			return responseContainer [0];
		};

		//强制json dataType
		s.dataTypes [0] =“json”;

		//安装回调
		overwritten = window [callbackName];
		window [callbackName] = function（）{
			responseContainer = arguments;
		};

		//清理功能（转换器后触发）
		jqXHR.always（function（）{

			//如果以前的值不存在 - 将其删除
			if（覆盖=== undefined）{
				jQuery（window）.removeProp（callbackName）;

			//否则恢复预先存在的值
			} else {
				window [callbackName] =覆盖;
			}

			//保存为免费
			if（s [callbackName]）{

				//确保重新使用这些选项并不能解决问题
				s.jsonpCallback = originalSettings.jsonpCallback;

				//保存回调名称以备将来使用
				oldCallbacks.push（callbackName）;
			}

			//如果它是一个函数则调用，我们有一个响应
			if（responseContainer && jQuery.isFunction（覆盖））{
				覆盖（responseContainer [0]）;
			}

			responseContainer = overwritten = undefined;
		}）;

		//委派给脚本
		返回“脚本”;
	}
}）;




// data：html的字符串
// context（可选）：如果指定，将在此上下文中创建片段，
//默认为文档
// keepScripts（可选）：如果为true，将包含在html字符串中传递的脚本
jQuery.parseHTML = function（data，context，keepScripts）{
	if（！data || typeof data！==“string”）{
		return null;
	}
	if（typeof context ===“boolean”）{
		keepScripts = context;
		context = false;
	}
	context = context || 文献;

	var parsed = rsingleTag.exec（data），
		scripts =！keepScripts && [];

	//单个标签
	if（已解析）{
		return [context.createElement（parsed [1]）];
	}

	parsed = buildFragment（[data]，context，scripts）;

	if（scripts && scripts.length）{
		jQuery（脚本）.remove（）;
	}

	return jQuery.merge（[]，parsed.childNodes）;
};


//保留旧加载方法的副本
var _load = jQuery.fn.load;

/ **
 *将网址加载到页面中
 * /
jQuery.fn.load = function（url，params，callback）{
	if（typeof url！==“string”&& _load）{
		return _load.apply（this，arguments）;
	}

	var选择器，类型，响应，
		自我=这个，
		off = url.indexOf（“”）;

	if（off> -1）{
		selector = jQuery.trim（url.slice（off，url.length））;
		url = url.slice（0，off）;
	}

	//如果它是一个功能
	if（jQuery.isFunction（params））{

		//我们假设这是回调
		callback = params;
		params = undefined;

	//否则，构建一个参数字符串
	} else if（params && typeof params ===“object”）{
		type =“POST”;
	}

	//如果我们要修改元素，请发出请求
	if（self.length> 0）{
		jQuery.ajax（{
			url：url，

			//如果未定义“type”变量，则使用“GET”方法。
			//从而明确显示此字段的值
			//用户可以通过ajaxSetup方法覆盖它
			类型：类型|| “得到”，
			dataType：“html”，
			数据：params
		} .done（function（responseText）{

			//保存响应以用于完整回调
			response = arguments;

			self.html（选择器？

				//如果指定了选择器，则在虚拟div中找到正确的元素
				//排除脚本以避免IE'权限被拒绝'错误
				jQuery（“<div>”）。append（jQuery.parseHTML（responseText））。find（selector）：

				//否则使用完整的结果
				responseText）;

		//如果请求成功，此函数将获得“data”，“status”，“jqXHR”
		//但是它们会被忽略，因为上面设置了响应。
		//如果失败，此函数将获得“jqXHR”，“status”，“error”
		} .always（callback && function（jqXHR，status）{
			self.each（function（）{
				callback.apply（this，response || [jqXHR.responseText，status，jqXHR]）;
			}）;
		}）;
	}

	归还这个;
};




//附加一堆函数来处理常见的AJAX事件
jQuery.each（[
	“ajaxStart”
	“ajaxStop”
	“ajaxComplete”
	“ajaxError”
	“的ajaxSuccess”
	“ajaxSend”
]，function（i，type）{
	jQuery.fn [type] = function（fn）{
		return this.on（type，fn）;
	};
}）;




jQuery.expr.filters.animated = function（elem）{
	return jQuery.grep（jQuery.timers，function（fn）{
		return elem === fn.elem;
	} ）。长度;
};





/ **
 *从元素中获取一个窗口
 * /
function getWindow（elem）{
	返回jQuery.isWindow（elem）？
		元素：
		elem.nodeType === 9？
			elem.defaultView || elem.parentWindow：
			假;
}

jQuery.offset = {
	setOffset：function（elem，options，i）{
		var curPosition，curLeft，curCSSTop，curTop，curOffset，curCSSLeft，calculatePosition，
			position = jQuery.css（elem，“position”），
			curElem = jQuery（elem），
			props = {};

		//首先设置位置，即使在静态elem上也设置了in-top top / left
		if（position ===“static”）{
			elem.style.position =“亲戚”;
		}

		curOffset = curElem.offset（）;
		curCSSTop = jQuery.css（elem，“top”）;
		curCSSLeft = jQuery.css（elem，“left”）;
		calculatePosition =（位置===“绝对”||位置===“固定”）&&
			jQuery.inArray（“auto”，[curCSSTop，curCSSLeft]）> -1;

		//需要能够计算顶部或左侧的位置
		//是auto，position是绝对的还是固定的
		if（calculatePosition）{
			curPosition = curElem.position（）;
			curTop = curPosition.top;
			curLeft = curPosition.left;
		} else {
			curTop = parseFloat（curCSSTop）|| 0;
			curLeft = parseFloat（curCSSLeft）|| 0;
		}

		if（jQuery.isFunction（options））{

			//在这里使用jQuery.extend来修改坐标参数（gh-1848）
			options = options.call（elem，i，jQuery.extend（{}，curOffset））;
		}

		if（options.top！= null）{
			props.top =（options.top  -  curOffset.top）+ curTop;
		}
		if（options.left！= null）{
			props.left =（options.left  -  curOffset.left）+ curLeft;
		}

		if（选项中“使用”）{
			options.using.call（elem，props）;
		} else {
			curElem.css（道具）;
		}
	}
};

jQuery.fn.extend（{
	offset：function（options）{
		if（arguments.length）{
			返回选项=== undefined？
				这个 ：
				this.each（function（i）{
					jQuery.offset.setOffset（this，options，i）;
				}）;
		}

		var docElem，win，
			box = {top：0，left：0}，
			elem = this [0]，
			doc = elem && elem.ownerDocument;

		if（！doc）{
			返回;
		}

		docElem = doc.docu mentElement;

		//确保它不是断开连接的DOM节点
		if（！jQuery.contains（docElem，elem））{
			回程箱;
		}

		//如果我们没有gBCR，只需使用0,0而不是错误
		// BlackBerry 5，iOS 3（原装iPhone）
		if（typeof elem.getBoundingClientRect！==“undefined”）{
			box = elem.getBoundingClientRect（）;
		}
		win = getWindow（doc）;
		返回{
			top：box.top +（win.pageYOffset || docElem.scrollTop） - （docElem.clientTop || 0），
			left：box.left +（win.pageXOffset || docElem.scrollLeft） - （docElem.clientLeft || 0）
		};
	}，

	position：function（）{
		if（！this [0]）{
			返回;
		}

		var offsetParent，offset，
			parentOffset = {top：0，left：0}，
			elem = this [0];

		//固定元素偏离窗口（parentOffset = {top：0，left：0}，
		//因为它是唯一的偏移父级
		if（jQuery.css（elem，“position”）===“fixed”）{

			//我们假设当计算位置固定时，getBoundingClientRect可用
			offset = elem.getBoundingClientRect（）;
		} else {

			//获取* real * offsetParent
			offsetParent = this.offsetParent（）;

			//获取正确的偏移量
			offset = this.offset（）;
			if（！jQuery.nodeName（offsetParent [0]，“html”））{
				parentOffset = offsetParent.offset（）;
			}

			//添加offsetParent边框
			parentOffset.top + = jQuery.css（offsetParent [0]，“borderTopWidth”，true）;
			parentOffset.left + = jQuery.css（offsetParent [0]，“borderLeftWidth”，true）;
		}

		//减去父偏移和元素边距
		//注意：当元素有边距时：自动offsetLeft和marginLeft
		//在Safari中是相同的，导致offset.left错误地为0
		返回{
			top：offset.top  -  parentOffset.top  -  jQuery.css（elem，“marginTop”，true），
			left：offset.left  -  parentOffset.left  -  jQuery.css（elem，“marginLeft”，true）
		};
	}，

	offsetParent：function（）{
		return this.map（function（）{
			var offsetParent = this.offsetParent;

			while（offsetParent &&（！jQuery.nodeName（offsetParent，“html”）&&
				jQuery.css（offsetParent，“position”）===“static”））{
				offsetParent = offsetParent.offsetParent;
			}
			return offsetParent || documentElement;
		}）;
	}
}）;

//创建scrollLeft和scrollTop方法
jQuery.each（{scrollLeft：“pageXOffset”，scrollTop：“pageYOffset”}，function（method，prop）{
	var top = /Y/.test(prop）;

	jQuery.fn [method] = function（val）{
		return access（this，function（elem，method，val）{
			var win = getWindow（elem）;

			if（val === undefined）{
				回归胜利？（支持胜利）？胜利[prop]：
					win.document.documentElement [方法]：
					elem [方法];
			}

			if（win）{
				win.scrollTo（
					！最佳 ？val：jQuery（win）.scrollLeft（），
					最佳 ？val：jQuery（win）.scrollTop（）
				）;

			} else {
				elem [方法] = val;
			}
		}，method，val，arguments.length，null）;
	};
}）;

//支持：Safari <7-8 +，Chrome <37-44 +
//使用jQuery.fn.position添加top / left cssHooks
// Webkit bug：https：//bugs.webkit.org/show_bug.cgi？id = 29084
//当为top / left / bottom / right指定时，getComputedStyle返回百分比
//而不是让css模块依赖于偏移模块，我们只是在这里检查它
jQuery.each（[“top”，“left”]，function（i，prop）{
	jQuery.cssHooks [prop] = addGetHookIf（support.pixelPosition，
		function（elem，calculated）{
			if（computed）{
				computed = curCSS（elem，prop）;

				//如果curCSS返回百分比，则回退到偏移量
				return rnumnonpx.test（computed）？
					jQuery（elem）.position（）[prop] +“px”：
					计算;
			}
		}
	）;
}）;


//创建innerHeight，innerWidth，height，width，outerHeight和outerWidth方法
jQuery.each（{Height：“height”，Width：“width”}，function（name，type）{
	jQuery.each（{padding：“inner”+ name，content：type，“”：“outer”+ name}，
	function（defaultExtra，funcName）{

		// margin仅适用于outerHeight，outerWidth
		jQuery.fn [funcName] = function（margin，value）{
			var chainable = arguments.length &&（defaultExtra || typeof margin！==“boolean”），
				extra = defaultExtra || （margin === true || value === true？“margin”：“border”）;

			return access（this，function（elem，type，value）{
				var doc;

				if（jQuery.isWindow（elem））{

					//截至2012年5月8日，这将为Mobile Safari产生不正确的结果，但在那里
					//不是我们能做的很多事。请参阅此URL的拉取请求以供讨论：
					// https://github.com/jquery/jquery/pull/764
					return elem.document.documentElement [“client”+ name];
				}

				//获取文档宽度或高度
				if（elem.nodeType === 9）{
					doc = elem.documentElement;

					//滚动[宽度/高度]或偏移[宽度/高度]或客户端[宽度/高度]，
					//无论哪个最好
					//不幸的是，这只会导致IE6 / 8中的bug＃3838，
					//但目前没有好的，小的方法来解决它。
					返回Math.max（
						elem.body [“scroll”+ name]，doc [“scroll”+ name]，
						elem.body [“offset”+ name]，doc [“offset”+ name]，
						doc [“客户”+名称]
					）;
				}

				返回值=== undefined？

					//获取元素的宽度或高度，请求但不强制parseFloat
					jQuery.css（elem，type，extra）：

					//在元素上设置宽度或高度
					jQuery.style（elem，type，value，extra）;
			，类型，可链接？margin：undefined，chainable，null）;
		};
	}）;
}）;


jQuery.fn.extend（{

	bind：function（types，data，fn）{
		return this.on（types，null，data，fn）;
	}，
	unbind：function（types，fn）{
		return this.off（types，null，fn）;
	}，

	delegate：function（selector，types，data，fn）{
		return this.on（types，selector，data，fn）;
	}，
	undelegate：function（selector，types，fn）{

		//（名称空间）或（selector，types [，fn]）
		return arguments.length === 1？
			this.off（选择器，“**”）：
			this.off（types，selector ||“**”，fn）;
	}
}）;

//匹配元素集中包含的元素数
jQuery.fn.size = function（）{
	return this.length;
};

jQuery.fn.andSelf = jQuery.fn.addBack;




//注册为命名的AMD模块，因为jQuery可以与其他模块连接
//可能使用define的文件，但不能通过适当的连接脚本
//了解匿名AMD模块。名为AMD的安全且最强大
//注册方式 使用小写jquery是因为AMD模块名称是
//从文件名派生，jQuery通常以小写形式提供
// 文件名。在创建全局之后执行此操作，以便在AMD模块需要时执行此操作
//调用noConflict来隐藏这个版本的jQuery，它会起作用。

//请注意，为了获得最大的可移植性，不应该是jQuery的库
//将自己声明为匿名模块，并避免设置全局if
// AMD加载程序存在。jQuery是一个特例。有关更多信息，请参阅
// https://github.com/jrburke/requirejs/wiki/Updating-existing-libraries#wiki-anon

if（typeof define ===“function”&& define.amd）{
	define（“jquery”，[]，function（）{
		return jQuery;
	}）;
}



VAR

	//在覆盖的情况下映射jQuery
	_jQuery = window.jQuery，

	//在覆盖的情况下覆盖$
	_ $ = window。$;

jQuery.noConflict = function（deep）{
	if（window。$ === jQuery）{
		窗口。$ = _ $;
	}

	if（deep && window.jQuery === jQuery）{
		window.jQuery = _jQuery;
	}

	return jQuery;
};

//公开jQuery和$标识符，即使在
// AMD（＃7102＃comment：10，https：//github.com/jquery/jquery/pull/557）
//和浏览器模拟器的CommonJS（＃13566）
if（！noGlobal）{
	window.jQuery = window。$ = jQuery;
}

return jQuery;
}））;