class TriviaManager {
    constructor() {
        this.questions = [
            {
                "question": "מה בירת ישראל?",
                "answers": [
                    "ירושלים",
                    "תל אביב",
                    "חיפה",
                    "באר שבע"
                ],
                "correctAnswer": 0
            },
            {
                "question": "מי כתב את 'אלתרמן הצעיר'?",
                "answers": [
                    "לאה גולדברג",
                    "חיים נחמן ביאליק",
                    "נתן אלתרמן",
                    "רחל המשוררת"
                ],
                "correctAnswer": 2
            },
            {
                "question": "כמה שבטים יש בעם ישראל?",
                "answers": [
                    "10",
                    "12",
                    "7",
                    "15"
                ],
                "correctAnswer": 1
            },
            {
                "question": "באיזו שנה הוקמה מדינת ישראל?",
                "answers": [
                    "1947",
                    "1948",
                    "1949",
                    "1950"
                ],
                "correctAnswer": 1
            },
            {
                "question": "מהו ההר הגבוה ביותר בישראל?",
                "answers": [
                    "הר תבור",
                    "הר מירון",
                    "הר הרצל",
                    "החרמון"
                ],
                "correctAnswer": 3
            },
            {
                "question": "מי היה הבן הבכור של יצחק אבינו?",
                "answers": [
                    "יעקב",
                    "עשו",
                    "ישמעאל",
                    "ראובן"
                ],
                "correctAnswer": 1
            },
            {
                "question": "כמה ימים נמשך המבול?",
                "answers": [
                    "30 יום",
                    "40 יום",
                    "50 יום",
                    "60 יום"
                ],
                "correctAnswer": 1
            },
            {
                "question": "מי היה המלך הראשון של עם ישראל?",
                "answers": [
                    "דוד",
                    "שלמה",
                    "שאול",
                    "רחבעם"
                ],
                "correctAnswer": 2
            },
            {
                "question": "איזה ים הוא הנמוך ביותר בעולם?",
                "answers": [
                    "ים סוף",
                    "הים התיכון",
                    "ים המלח",
                    "ים כנרת"
                ],
                "correctAnswer": 2
            },
            {
                "question": "מי היה הנביא שבלע אותו דג גדול?",
                "answers": [
                    "יונה",
                    "ירמיהו",
                    "ישעיהו",
                    "יחזקאל"
                ],
                "correctAnswer": 0
            },
            {
                "question": "מהו הפרי שהביאו המרגלים מארץ כנען?",
                "answers": [
                    "תפוח",
                    "רימון",
                    "תמר",
                    "אשכול ענבים"
                ],
                "correctAnswer": 3
            },
            {
                "question": "מהי העיר העתיקה ביותר בישראל?",
                "answers": [
                    "ירושלים",
                    "יריחו",
                    "צפת",
                    "באר שבע"
                ],
                "correctAnswer": 1
            },
            {
                "question": "כמה פעמים חצו בני ישראל את הים ביציאת מצרים?",
                "answers": [
                    "פעם אחת",
                    "פעמיים",
                    "שלוש פעמים",
                    "ארבע פעמים"
                ],
                "correctAnswer": 0
            },
            {
                "question": "מהו אורכה של ישראל מאילת ועד ראש הנקרה?",
                "answers": [
                    "כ-250 ק\"מ",
                    "כ-470 ק\"מ",
                    "כ-630 ק\"מ",
                    "כ-850 ק\"מ"
                ],
                "correctAnswer": 1
            },
            {
                "question": "מי היה אחיו של משה?",
                "answers": [
                    "אהרן",
                    "יהושע",
                    "כלב",
                    "נדב"
                ],
                "correctAnswer": 0
            }
        ];
        this.currentQuestion = null;
    }

    getRandomQuestion() {
        const randomIndex = Math.floor(Math.random() * this.questions.length);
        return this.questions[randomIndex];
    }

    showTriviaModal(onCorrectAnswer, onWrongAnswer) {
        const modal = document.getElementById('triviaModal');
        const questionText = document.getElementById('questionText');
        const answersDiv = document.getElementById('answers');
        const feedbackDiv = document.getElementById('feedback');
        
        // Reset feedback
        feedbackDiv.style.display = 'none';
        feedbackDiv.className = 'feedback';
        
        this.currentQuestion = this.getRandomQuestion();
        
        questionText.textContent = this.currentQuestion.question;
        answersDiv.innerHTML = '';
        
        this.currentQuestion.answers.forEach((answer, index) => {
            const button = document.createElement('button');
            button.className = 'answer-btn';
            button.textContent = answer;
            button.onclick = () => this.checkAnswer(index, onCorrectAnswer, onWrongAnswer);
            answersDiv.appendChild(button);
        });
        
        modal.style.display = 'block';
    }

    checkAnswer(selectedIndex, onCorrectAnswer, onWrongAnswer) {
        const feedbackDiv = document.getElementById('feedback');
        const answersDiv = document.getElementById('answers');
        const modal = document.getElementById('triviaModal');
        
        // Disable all answer buttons
        const buttons = answersDiv.getElementsByClassName('answer-btn');
        for (let button of buttons) {
            button.disabled = true;
        }
        
        // Show feedback
        feedbackDiv.style.display = 'block';
        
        if (selectedIndex === this.currentQuestion.correctAnswer) {
            feedbackDiv.className = 'feedback correct';
            feedbackDiv.innerHTML = 'כל הכבוד! תשובה נכונה! <br><button class="continue-btn">המשך לשחק</button>';
            
            const continueBtn = feedbackDiv.querySelector('.continue-btn');
            continueBtn.onclick = () => {
                modal.style.display = 'none';
                onCorrectAnswer();
            };
        } else {
            feedbackDiv.className = 'feedback wrong';
            feedbackDiv.innerHTML = 'אופס... התשובה לא נכונה. <br><button class="continue-btn">התחל משחק חדש</button>';
            
            const continueBtn = feedbackDiv.querySelector('.continue-btn');
            continueBtn.onclick = () => {
                modal.style.display = 'none';
                onWrongAnswer();
            };
        }
    }
}

const triviaManager = new TriviaManager(); 