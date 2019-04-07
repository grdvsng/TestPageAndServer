var Page = {
	/*  Class(Object) Page.
			description:
				Main class for document style preset, active elements and modifications.

			attributes:
				---------------------------------------------------
				|name            | type               | desription
				---------------------------------------------------
				domain_result    | boolean \ HTMLelem | is div from .base_form innerHTML with special result elem
				elems            | Array              | array with optiont for Page active elements;
				getBy            | Array              | array with getElement's methods used on Page;
				is_attention     | boolean \ HTMLelem | does special arention element is visible;
				submit_activated | boolean \ HTMLelem | does submit button available for user.

			methods:
				constructor: {
					varibles:
						none.
			
					return:
						none.

					desription: 
						check screen size and include special css style.
				},
				
				onload: {
					varibles:
						none.
			
					return:
						none.

					desription: 
						parse page use Page Elem array;
							find elems (used id||tag||class from array);
								connect to page basic elems methods and attributes from Page.elems array.
				},
				
				set_elem_Attributes: {
					varibles:
						required:
							elem 	- HTML elem - elem from documen for preset;
							diction - Array     - Array from Page.Elems with some elem data;
						
					return:
						none.

					desription: 
						use preset from Page.elems['elem name'] Array for set document elemnt.
				},

				find_element_or_elements: {
					varibles:
						required:
							element - Array - object from Page.elems.
			
					return:
						if data have class or tag:
							Array with HTMLelems.
						else:
							HTMTelement. 
						
						*from document.

					desription: 
						parse Elem Array data(id, tag, class) from Page.elems, 
						if data != null use this for find elem from document.
				},

				click_animation: {
					varibles:
						required: 
							elem - HTMLelement - element to animate.
						
						optional:
							style       - string 
								default - 'resize'  - use for standart click animation;
										- 'recolor' - use for set grey element backgrounColor.

							resize_index - Array
								default - [
									0.97 - element clicked width; 
									0.94 - element clicked heigth; 
								]
								* formula for undestd how riseze work: 
									elem.style.width*resize_index[0];
									elem.style.heigth*resize_index[1].

					return:
						none.

					desription: 
						animate HTMLelement from document.
				},

				is_url: {
					varibles:
						required: 
							val - string - some sting.
			
					return:
						bolean:
							if val is url true;
							else false.

					desription: 
						parse val and return boolean.
				},

				attention: {
					varibles:
						optional:
							text 
								defalt - '';
								- sting  - string for inner in attention element.

							bg   - 
								defalt - 'red';
								string - string with css color format for attention backgrounColor.
							
					return:
						attenton element.

					desription: 
						create in visible page top special element with some information.
				}
	*/

	elems: {
		/* It is special Array next format:
			'key for element': {
				id:    'document element ID' | null,
				tag:   'document elements tag' | null,
				class: 'document elements class' | null,
			
				attributes: {
					'some HTMLelement atributes': parametr || function will connect to EQU page element.
				},
				
				methods: {
					'name': 'function()'
					* to haven't mistake methods should create only with only one element(with ID not tag/class)
				}		
			}
		*/

		base_form: {
			id: false,
			tag: false,
			class: "domain_base_form",

			attributes: {
				onsubmit: function(event) {
					event.preventDefault();
				},
			}
		},

		base_form_div: {
			id: "domain_base_form_div",
			tag: false,
			class: false,

			attributes: {
			}
		},

		base_form_input: {
			id: "domain_base_form_input",
			tag: false,
			class: false,

			attributes: {
				onkeyup: function () {
					if (Page.is_attention !== false) {this.methods.uninstal_attention();}

					if (this.value.length >= 2) {Page.base_form_submit.methods.submit_active();}
					else {Page.base_form_submit.methods.submit_deactive();}
				},
			},

			methods: {
				uninstal_attention: function() {
					document.body.removeChild(Page.is_attention);
					Page.is_attention = false;
				},
			}
		},

		base_form_submit: { 
			id: "domain_base_form_submit",
			tag: false,
			class: false,

			attributes: {
				onclick: function() {
					if (!Page.submit_activated) {return false;}
					
					else {
						Page.click_animation(Page.base_form_submit); 
						this.methods.submit_click(event);
					}
				}
			},

			methods: {
				submit_active:  function() {
					if (!Page.submit_activated) {
						Page.base_form_submit.style.pointerEvents   = 'auto';
						Page.base_form_submit.style.backgroundColor = 'rgb(40, 116, 166)';
						
						Page.submit_activated = true;
					}

					return Page.submit_activated;
				},

				submit_click: function(event) {
					let value   = Page.base_form_input.value,
						keyCode = event.keyCode,
						self    = (this.methods) ? this.methods:this;

					if (Page.domain_result) {self.remove_domain_result();}

					if (Page.is_url(value)) {
						var status;

						if (Math.floor(Math.random() * 10) > 5) {status = true;}
						else {status = false;}

						self.domain_status(status, value);
					}

					else {
						self.submit_deactive();
						Page.attention(value + " - неправильный формат домена.");
					}
				},

				submit_deactive: function() {
					if (Page.submit_activated) {
						Page.base_form_submit.style.pointerEvents   = 'none';
						Page.base_form_submit.style.backgroundColor = 'rgb(71, 71, 71)';	
						Page.base_form_submit.style.backgroundColor = 'rgba(40, 116, 166, 0.2)';

						Page.submit_activated = false;	
					}

					return Page.submit_activated;
				},

				domain_status: function(bool, value) {
					let text      = "Домен " + value + " - ",
						prise     = (Math.floor(Math.random() * 100) + 38) + "₽",
						color     = bool ? "SeaGreen":"Tomato",
						status    = bool ? "свободен.":"занят.",
						bye_state = bool ? "Купить за " + prise:"Попробуйте снова.",
						message   = text + status;

					var elem = document.createElement("p");
					elem.addEventListener('click', 
						function(event){
							return Page.base_form_status.methods.domain_status_p_click(event, bool);
						}
					)

					Page.base_form_status.innerHTML = message;
					Page.base_form_status.appendChild(elem);

					elem.style.color = color;
					elem.innerHTML   = bye_state;

					Page.domain_result = elem;
					return elem;
				},

				remove_domain_result: function() {
					Page.base_form_status.removeChild(Page.base_form_status.firstChild);
						
					Page.base_form_status.innerHTML = Page.status_basic_text;
					Page.domain_result = false;

					return Page.domain_result;
				},

			}
		},

		base_form_status: {
			id: "domain_base_form_domain_status",
			tag: false,
			class: false,

			attributes: {
			},

			methods: {
				domain_status_p_click: function(event, bool) {
					var target = event.target;

					function timeout(func) {setTimeout(function() {eval(func)}, 10);}
					Page.click_animation(target, 'recolor');
					
					if (bool) {timeout("alert('Переход временно не доступен')");}

					else {
						Page.base_form_input.value = Page.base_form_input.value.split('.')[0] + '.';
						timeout('Page.base_form_submit.methods.remove_domain_result()');
					}
				}
			}
		},

		body: {
			id: false,
			tag: "body",
			class: false, 

			attributes: {
				onscroll: function(event, topY) {
					var topY = (topY !== undefined) ? topY:window.scrollY;

					if (Page.is_attention !== false) {
						var top = Math.max(topY, Page.body[0].getBoundingClientRect().top);
						top = (top > 0) ? top : -top;
						console.log(Page.body[0].getBoundingClientRect().top)
						Page.is_attention.style.top = top + 'px';
					}
				}
			},
		},

		create_buttons: {
			id: false,
			tag: false,
			class: "AccountCreateButton",

			attributes: {
				onclick: function() {
					Page.click_animation(this, 'resize', [1, 0.97]);
					Page.attention("Регистрация аккаунтов временно недоступна.");
				}
			}
		},

		sentence_div_top: {
			id: "top_Sentence",
			tag: false,
			class: false,

			attributes: {
			}
		},

		sentence_div_bot: {
			id: "bottom_Sentence",
			tag: false,
			class: false,

			attributes: {
			}
		},

		sentence_icon: {
			id: false,
			tag: false,
			class: "sentence_icons",

			attributes: {
				onmouseout:  function() {
					Page.sentence_div.style.visibility = 'hidden';
					Page.sentence_div.style.display    = 'none';
				},
				
				onmouseover: function() {
					var target   	 = event.target,
						top_id		 = 'top_icons_line',
						parent       = target.parentElement,
						line         = parent.parentElement.id,
						hidden_text  = parent.getElementsByTagName('h3')[0],
						text  		 = (hidden_text) ? hidden_text.innerHTML:'Текст недоступен';
					
					Page.sentence_div = (line === top_id) ? Page.sentence_div_top:Page.sentence_div_bot;

					Page.sentence_div.innerHTML        = text;
					Page.sentence_div.style.visibility = 'visible';
					Page.sentence_div.style.display    = 'inline-block';
				}
			},
		},

		special_offer: {
			id: "special_offer",
			tag: false,
			class: false,

			attributes: {
				onmouseout: function() {
					this.style.transform = 'rotateY(-15deg)';
					this.style.filter    = 'hue-rotate(180deg)';				
				},

				onmouseleave: function() {
					this.style.transform = 'none';
					this.style.filter    = 'none';
				},

				onclick: function() {
					Page.attention("Ваш сеанс превысил 24 часа.");
				}
			},
		},

		logo: {
			id: false,
			tag: false,
			class: 'logo',

			attributes: {
			},
		},
	},


	__init__: function() {
		/*  function __init__ class Page.
			check window width and include css style.

		*/

		let width = screen.width,
			size  = (width >= 910) ? "main_size":"other_size",
			style = 'content/styles/' + size + '.css',
			link  = document.createElement("link");
		
		link.href = style;
		link.rel  = "stylesheet";
		link.type = "text/css";

		document.head.appendChild(link);

		Page.submit_activated   = false
		Page.is_attention       = false
		Page.domain_result      = false
		Page.status_basic_text  = "Введите имя домена с кодом страны";
	},

	onload: function() {
		/* Method onload class Page.
			desription: 
				parse and preset page elems use Page Elem array
		
		*/

		for (var n in this.elems) {
			let elem  = this.elems[n];

			Page[n] = this.find_element_or_elements(elem);
			if (Page[n] instanceof Array) {
				for (var num in Page[n]) {this.set_elem_Attributes(Page[n][num], elem);}
			}
			else {this.set_elem_Attributes(Page[n], elem);}
		}
	},

	set_elem_Attributes: function(elem, diction) {
		/*  Method set_elem_Attributes class Page.
				set_elem_Attributes: 
					varibles:
						required:
							elem 	- HTML elem - elem from documen for preset;
							diction - Array     - Array from Page.Elems with some elem data;
						
					return:
						none.

					desription: 
						use preset from Page.elems['elem name'] Array for set document elemnt.
		*/

		let attributes = diction.attributes,
			methods    = diction.methods;

		for (var att in attributes) {
			elem[att]   = attributes[att];
		}

		elem.methods = (methods) ? methods:null;
	},

	find_element_or_elements: function(element) {
		/*  Method find_element_or_elements class Page.
				varibles:
					reqiered:
						element - Array - object from Page.elems.
		
				return:
					method getBy results;

				desription: 
					parse Elem Array data(id, tag, class) from Page.elems, 
					if data != null use this for find elem from document.
					
		*/

		for (var n in element) {
			if (n === 'id' || n === 'class' || n === 'tag') {
				let response = element[n];

				if (response) {
					var result = Page.getBy(n, response);
					break;
				}
			}
		}

		return result;
	},


	getBy: function(key, val){
		/*  Method getBy class Page.
				varibles:
					reqiered:
						key - string - id name of element(class\id\tag)
						val - string - element id.
		
				return:
					if data have class or tag:
						Array with HTMLelems.
					else:
						HTMTelement. 
					
					*from document.

				desription: 
					find elements with use val.
					
		*/

		var formulas = {
			id: function(id) {
				return document.getElementById(id);
			},

			className: function(id) {
				return Array.prototype.slice.call(document.getElementsByClassName(id));
			},

			tag: function(id) {
				return Array.prototype.slice.call(document.getElementsByTagName(id));
			},
		};

		if (key === 'class') {key ='className';}
		return formulas[key](val);
	},
	
	click_animation: function(elem, style, resize_index) {
		/* Method click_animation class Page.
				varibles:
					required: 
						elem - HTMLelement - element to animate.
					
					optional:
						style       - string 
							default - 'resize'  - use for standart click animation;
									- 'recolor' - use for set grey element backgrounColor.

						resize_index - Array
							format - [
								number1 - element clicked width; 
								number  - element clicked heigth; 
							]

				return:
					none.

				desription: 
					animate HTMLelement from document.

		*/

		var style 		 = (style === undefined) ? 'resize':style,
			resize_index = (resize_index === undefined) ? [0.97, 0.94]:resize_index,
			rect 		 = elem.getBoundingClientRect(),
			colr 		 = elem.style.color;

		function reSize(play){
			if (play) {
				elem.style.width  = rect.width  * resize_index[0] + 'px';
				elem.style.height = rect.height * resize_index[1] + 'px';

				setTimeout(function() {return reSize(false);}, 100);
			}
			else {
				elem.style.width = rect.width + 'px';
				elem.style.height = rect.height + 'px';			
			}
		}

		function reColor(play) {elem.style.color = 'grey';}

		var animations = {
				resize:  reSize,
				recolor: reColor
			},
			main_f     = animations[style];

		main_f(true);
	},

	is_url: function(val) {
		/*  Method is_url class Page.
				varibles:
					required: 
						val - string - some sting.

				desription: 
					parse val and return boolean (is val url or not).

		*/

  		var pattern = new RegExp(
  			'((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ 
  			'((\\d{1,3}\\.){3}\\d{1,3}))'+
		  	'(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+
		  	'(\\?[;&a-z\\d%_.~+=-]*)?'+ 
		  	'(\\#[-a-z\\d_]*)?$','i');
  		
  		return pattern.test(val);
	},

	attention: function(text, bg) {
		/*	Method attention class Page.
				varibles:
					optional:
						text - sting  - string for inner in attention element;
						bg   - string - string with css color format for attention backgrounColor.
						
				return:
					Created HTMLelement.

				desription: 
					create in visible page top special element with some information.
				
		*/

		var text = (text !== undefined) ? text:"",
			bg   = (bg !== undefined) ? bg:null,
			elem = document.createElement('div'),
			body = this.body[0],
			rect = body.getBoundingClientRect(),
			top  = Math.max((window.scrollY) ? window.scrollY:0, window.pageYOffset, rect.top);

		if (Page.is_attention) {body.removeChild(Page.is_attention);}
		if (bg) {elem.style.backgroundColor = bg;}
		console.log(window.scrollY, window.pageYOffset, rect.top)
		elem.style.top    = top + 'px';
		elem.className    = "Attention";
		elem.id           = "NowAttention"
		elem.style.width  = rect.width;

		body.appendChild(elem);
		elem.innerHTML = text;
		
		Page.is_attention = elem;
		return Page.is_attention;
	}
}


window.onload = function() {
	Page.__init__();
	Page.onload();
	
	if (!!document.documentMode){IE_preset();}		
};

function IE_preset() {
	Page.logo.forEach(
		function(logo) {
			var img      = logo.getElementsByTagName('img')[0],
				new_logo = document.createElement('p'),
				fSize    = img.getBoundingClientRect().width;

			logo.removeChild(img);

			new_logo.innerHTML = "ДЖИНО";
			new_logo.style.fontSize  = '1.3em';
			new_logo.style.verticalAlign = 'middle';

			logo.insertBefore(new_logo, logo.firstChild);
		}
	);

	window.addEventListener('scroll', function() {Page.body[0].onscroll(event, window.pageYOffset);});
}	
