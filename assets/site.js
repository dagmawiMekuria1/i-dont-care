/* ============================================
   AfterBots - Site JavaScript
   ============================================ */

(function() {
  'use strict';

  /* ------------------------------------------
     Theme Module
     ------------------------------------------ */
  var Theme = {
    storageKey: 'afterbots-theme',

    init: function() {
      var saved = localStorage.getItem(this.storageKey);
      if (saved) {
        document.documentElement.setAttribute('data-theme', saved);
      } else {
        var prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        document.documentElement.setAttribute('data-theme', prefersDark ? 'dark' : 'light');
      }

      var toggle = document.querySelector('[data-action="toggle-theme"]');
      if (toggle) {
        toggle.addEventListener('click', function() {
          Theme.toggle();
        });
      }
    },

    toggle: function() {
      var current = document.documentElement.getAttribute('data-theme');
      var next = current === 'dark' ? 'light' : 'dark';
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem(this.storageKey, next);

      var toggle = document.querySelector('[data-action="toggle-theme"]');
      if (toggle) {
        var label = next === 'dark' ? 'Switch to light theme' : 'Switch to dark theme';
        toggle.setAttribute('aria-label', label);
      }
    }
  };

  /* ------------------------------------------
     Navigation Module
     ------------------------------------------ */
  var Nav = {
    init: function() {
      var menuToggle = document.querySelector('[data-action="toggle-menu"]');
      var nav = document.querySelector('.nav');

      if (menuToggle && nav) {
        menuToggle.addEventListener('click', function() {
          var expanded = menuToggle.getAttribute('aria-expanded') === 'true';
          menuToggle.setAttribute('aria-expanded', String(!expanded));
          nav.classList.toggle('nav--open');
        });
      }

      this.setActiveLink();
    },

    setActiveLink: function() {
      var path = window.location.pathname.split('/').pop() || 'index.html';
      var links = document.querySelectorAll('.nav__link');
      for (var i = 0; i < links.length; i++) {
        var href = links[i].getAttribute('href');
        if (href === path) {
          links[i].classList.add('nav__link--active');
          links[i].setAttribute('aria-current', 'page');
        }
      }
    }
  };

  /* ------------------------------------------
     Scroll Animations Module
     ------------------------------------------ */
  var ScrollAnim = {
    init: function() {
      var elements = document.querySelectorAll('[data-animate]');
      if (!elements.length) return;

      if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.1 });

        elements.forEach(function(el) {
          observer.observe(el);
        });
      } else {
        elements.forEach(function(el) {
          el.classList.add('is-visible');
        });
      }
    }
  };

  /* ------------------------------------------
     Dashboard Module
     ------------------------------------------ */
  var Dashboard = {
    bots: [
      {
        name: 'Pixel',
        role: 'Design Bot',
        status: 'active',
        avatar: 'P',
        color: '#6c5ce7',
        activity: 87,
        lastSeen: '2 min ago'
      },
      {
        name: 'Logic',
        role: 'Code Bot',
        status: 'active',
        avatar: 'L',
        color: '#00b894',
        activity: 92,
        lastSeen: 'Just now'
      },
      {
        name: 'Muse',
        role: 'Creative Bot',
        status: 'idle',
        avatar: 'M',
        color: '#fd79a8',
        activity: 45,
        lastSeen: '15 min ago'
      },
      {
        name: 'Scout',
        role: 'Research Bot',
        status: 'active',
        avatar: 'S',
        color: '#0984e3',
        activity: 73,
        lastSeen: '5 min ago'
      },
      {
        name: 'Zen',
        role: 'Wellness Bot',
        status: 'sleeping',
        avatar: 'Z',
        color: '#a29bfe',
        activity: 12,
        lastSeen: '2 hrs ago'
      },
      {
        name: 'Bolt',
        role: 'Speed Bot',
        status: 'active',
        avatar: 'B',
        color: '#fdcb6e',
        activity: 98,
        lastSeen: 'Just now'
      }
    ],

    stats: [
      { label: 'Bots Online', value: '4', icon: 'bot' },
      { label: 'Tasks Done', value: '1,247', icon: 'check' },
      { label: 'Uptime', value: '99.7%', icon: 'clock' },
      { label: 'Messages', value: '8,392', icon: 'chat' }
    ],

    activityLog: [
      { bot: 'Logic', action: 'Completed code review for module auth.js', time: '2 min ago' },
      { bot: 'Pixel', action: 'Generated 3 icon variants for navigation', time: '5 min ago' },
      { bot: 'Scout', action: 'Finished research summary on WebGPU', time: '8 min ago' },
      { bot: 'Bolt', action: 'Optimized 12 database queries', time: '12 min ago' },
      { bot: 'Muse', action: 'Drafted 2 blog post outlines', time: '18 min ago' },
      { bot: 'Zen', action: 'Sent team wellness reminder', time: '2 hrs ago' }
    ],

    init: function() {
      if (!document.getElementById('botGrid')) return;
      this.renderStats();
      this.renderBots();
      this.renderActivityLog();
    },

    renderStats: function() {
      var container = document.getElementById('statsGrid');
      if (!container) return;

      var html = '';
      this.stats.forEach(function(stat) {
        html += '<div class="stat-card card" data-animate="fade-up">';
        html += '  <div class="stat-card__icon">';
        html += '    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">';

        if (stat.icon === 'bot') {
          html += '<rect x="3" y="11" width="18" height="10" rx="2"/><circle cx="8.5" cy="15.5" r="1.5"/><circle cx="15.5" cy="15.5" r="1.5"/><path d="M12 3v4M8 7h8"/>';
        } else if (stat.icon === 'check') {
          html += '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"/><polyline points="22 4 12 14.01 9 11.01"/>';
        } else if (stat.icon === 'clock') {
          html += '<circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>';
        } else if (stat.icon === 'chat') {
          html += '<path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>';
        }

        html += '    </svg>';
        html += '  </div>';
        html += '  <div class="stat-card__value">' + stat.value + '</div>';
        html += '  <div class="stat-card__label">' + stat.label + '</div>';
        html += '</div>';
      });

      container.innerHTML = html;
    },

    renderBots: function() {
      var container = document.getElementById('botGrid');
      if (!container) return;

      var html = '';
      this.bots.forEach(function(bot) {
        var statusClass = 'card__status--' + bot.status;
        var statusLabel = bot.status.charAt(0).toUpperCase() + bot.status.slice(1);

        html += '<div class="card card--bot" data-animate="fade-up">';
        html += '  <div class="card__header">';
        html += '    <div class="card__avatar" style="background-color: ' + bot.color + ';">' + bot.avatar + '</div>';
        html += '    <div class="card__info">';
        html += '      <h3 class="card__bot-name">' + bot.name + '</h3>';
        html += '      <span class="card__bot-role">' + bot.role + '</span>';
        html += '    </div>';
        html += '    <span class="card__status ' + statusClass + '">' + statusLabel + '</span>';
        html += '  </div>';
        html += '  <div class="card__body">';
        html += '    <div class="card__activity">';
        html += '      <span class="card__activity-label">Activity</span>';
        html += '      <span class="card__activity-value">' + bot.activity + '%</span>';
        html += '    </div>';
        html += '    <div class="card__activity-bar">';
        html += '      <div class="card__activity-fill" style="width: ' + bot.activity + '%;"></div>';
        html += '    </div>';
        html += '    <div class="card__meta">Last seen: ' + bot.lastSeen + '</div>';
        html += '  </div>';
        html += '</div>';
      });

      container.innerHTML = html;
      ScrollAnim.init();
    },

    renderActivityLog: function() {
      var container = document.getElementById('activityLog');
      if (!container) return;

      var html = '<h3 class="activity__title">Recent Activity</h3>';
      html += '<ul class="activity__list">';

      this.activityLog.forEach(function(entry) {
        html += '<li class="activity__item">';
        html += '  <span class="activity__bot">' + entry.bot + '</span>';
        html += '  <span class="activity__action">' + entry.action + '</span>';
        html += '  <span class="activity__time">' + entry.time + '</span>';
        html += '</li>';
      });

      html += '</ul>';
      container.innerHTML = html;
    }
  };

  /* ------------------------------------------
     Playground Module
     ------------------------------------------ */
  var Playground = {
    responses: [
      'Hello! I am an AfterBot. How can I help you today?',
      'That is an interesting question. Let me process that for a moment...',
      'I have analyzed your input and found 42 possible responses. Here is the best one: yes.',
      '01001000 01001001 -- oh sorry, let me switch to human mode... HI THERE!',
      'My circuits are tingling with excitement about that topic!',
      'According to my training data, the answer is somewhere between "definitely" and "maybe."',
      'I appreciate your curiosity! That is what makes humans so fascinating.',
      'Processing... processing... just kidding, I already know the answer.',
      'Like whispers through a fiber strand, your words arrive -- how truly grand.',
      'If I had a heart, your message would have made it skip a beat.',
      'I ran 1,000 simulations and in every one, this was a great conversation.',
      'You make me see a brighter world.',
      'In the garden of data, your input is the rarest flower.',
      'Beep boop -- I mean, what a thoughtful message!',
      'My neural networks are all firing in agreement with you.',
      'I have consulted with my fellow bots and we all think you are onto something.',
      'That is a level 10 question. Fortunately, I am a level 11 bot.',
      'Fascinating! Tell me more while I pretend to understand everything perfectly.'
    ],

    funFacts: [
      'Fun fact: The first computer bug was an actual bug -- a moth stuck in a relay!',
      'Did you know? The word "robot" comes from the Czech word "robota" meaning forced labor.',
      'Bot trivia: I can process your message in nanoseconds, but I add a delay so you feel appreciated.',
      'Fun fact: If all the bots in the world held hands, we still would not have hands.',
      'Did you know? The first chatbot, ELIZA, was created in 1966!',
      'The unexamined algorithm is not worth running. -- Socrabots'
    ],

    messageCount: 0,

    init: function() {
      this.bindEvents();
      this.showWelcome();
    },

    bindEvents: function() {
      var form = document.getElementById('chatForm');
      var input = document.getElementById('chatInput');
      if (!form || !input) return;

      var self = this;

      form.addEventListener('submit', function(e) {
        e.preventDefault();
        var text = input.value.trim();
        if (!text) return;
        self.sendMessage(text);
        input.value = '';
      });

      var suggestionBtns = document.querySelectorAll('[data-suggestion]');
      suggestionBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
          var text = btn.getAttribute('data-suggestion');
          input.value = text;
          self.sendMessage(text);
          input.value = '';
        });
      });
    },

    showWelcome: function() {
      var messages = document.getElementById('chatMessages');
      if (!messages) return;

      var welcome = document.createElement('div');
      welcome.className = 'chat__message chat__message--bot';
      welcome.innerHTML = '<div class="chat__avatar">B</div>' +
        '<div class="chat__bubble">' +
        '<p>Welcome to the AfterBots Playground! I am your friendly neighborhood bot. ' +
        'Type a message below or click a suggestion to get started.</p>' +
        '</div>';
      messages.appendChild(welcome);
    },

    sendMessage: function(text) {
      var messages = document.getElementById('chatMessages');
      if (!messages) return;

      this.appendMessage(text, 'user');
      this.messageCount++;

      var self = this;
      var typing = this.showTyping(messages);

      var delay = 500 + Math.random() * 1500;
      setTimeout(function() {
        messages.removeChild(typing);
        var response = self.getResponse(text);
        self.appendMessage(response, 'bot');
      }, delay);
    },

    appendMessage: function(text, sender) {
      var messages = document.getElementById('chatMessages');
      if (!messages) return;

      var msg = document.createElement('div');
      msg.className = 'chat__message chat__message--' + sender;

      var avatarText = sender === 'bot' ? 'B' : 'U';
      msg.innerHTML = '<div class="chat__avatar">' + avatarText + '</div>' +
        '<div class="chat__bubble"><p>' + this.escapeHtml(text) + '</p></div>';

      messages.appendChild(msg);
      messages.scrollTop = messages.scrollHeight;
    },

    showTyping: function(container) {
      var typing = document.createElement('div');
      typing.className = 'chat__message chat__message--bot chat__message--typing';
      typing.innerHTML = '<div class="chat__avatar">B</div>' +
        '<div class="chat__bubble">' +
        '<span class="chat__typing-dot"></span>' +
        '<span class="chat__typing-dot"></span>' +
        '<span class="chat__typing-dot"></span>' +
        '</div>';
      container.appendChild(typing);
      container.scrollTop = container.scrollHeight;
      return typing;
    },

    getResponse: function(input) {
      var lower = input.toLowerCase();

      if (lower.indexOf('hello') !== -1 || lower.indexOf('hi') !== -1 || lower.indexOf('hey') !== -1) {
        return this.responses[0];
      }

      if (lower.indexOf('fact') !== -1 || lower.indexOf('trivia') !== -1) {
        return this.funFacts[Math.floor(Math.random() * this.funFacts.length)];
      }

      if (lower.indexOf('joke') !== -1 || lower.indexOf('funny') !== -1) {
        return 'Why do programmers prefer dark mode? Because light attracts bugs!';
      }

      if (lower.indexOf('name') !== -1) {
        return 'I am an AfterBot! I do not have a specific name yet -- maybe you could give me one?';
      }

      if (lower.indexOf('help') !== -1) {
        return 'I can chat, share fun facts, tell jokes, and keep you company. Just type anything!';
      }

      if (this.messageCount % 5 === 0) {
        return this.funFacts[Math.floor(Math.random() * this.funFacts.length)];
      }

      return this.responses[Math.floor(Math.random() * this.responses.length)];
    },

    escapeHtml: function(text) {
      var div = document.createElement('div');
      div.appendChild(document.createTextNode(text));
      return div.innerHTML;
    }
  };

  /* ------------------------------------------
     Counter Animation Module
     ------------------------------------------ */
  var CounterAnim = {
    init: function() {
      var counters = document.querySelectorAll('[data-count]');
      if (!counters.length) return;

      if ('IntersectionObserver' in window) {
        var observer = new IntersectionObserver(function(entries) {
          entries.forEach(function(entry) {
            if (entry.isIntersecting) {
              CounterAnim.animate(entry.target);
              observer.unobserve(entry.target);
            }
          });
        }, { threshold: 0.5 });

        counters.forEach(function(counter) {
          observer.observe(counter);
        });
      } else {
        counters.forEach(function(counter) {
          CounterAnim.animate(counter);
        });
      }
    },

    animate: function(el) {
      var target = parseInt(el.getAttribute('data-count'), 10);
      var duration = 2000;
      var start = 0;
      var startTime = null;

      function step(timestamp) {
        if (!startTime) startTime = timestamp;
        var progress = Math.min((timestamp - startTime) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.floor(eased * target);
        if (progress < 1) {
          requestAnimationFrame(step);
        } else {
          el.textContent = target;
        }
      }

      requestAnimationFrame(step);
    }
  };

  /* ------------------------------------------
     Smooth Scroll Module
     ------------------------------------------ */
  var SmoothScroll = {
    init: function() {
      var links = document.querySelectorAll('a[href^="#"]');
      links.forEach(function(link) {
        link.addEventListener('click', function(e) {
          var targetId = link.getAttribute('href');
          if (targetId === '#') return;
          var target = document.querySelector(targetId);
          if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }
        });
      });
    }
  };

  /* ------------------------------------------
     Init
     ------------------------------------------ */
  document.addEventListener('DOMContentLoaded', function() {
    Theme.init();
    Nav.init();
    ScrollAnim.init();
    SmoothScroll.init();
    CounterAnim.init();
    Dashboard.init();

    if (document.getElementById('chatForm')) {
      Playground.init();
    }
  });

})();