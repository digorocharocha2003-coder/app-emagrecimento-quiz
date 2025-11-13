'use client';

import { useState, useEffect } from 'react';
import { CheckCircle2, Heart, Zap, Trophy, ArrowRight, Sparkles, Apple, Dumbbell, Target, Clock } from 'lucide-react';

interface QuizAnswer {
  question: string;
  answer: string;
}

interface UserProfile {
  answers: QuizAnswer[];
  completedAt?: string;
}

const questions = [
  {
    id: 1,
    question: 'Qual é o seu principal objetivo?',
    options: [
      { value: 'perder_peso', label: 'Perder peso', icon: Target },
      { value: 'ganhar_massa', label: 'Ganhar massa muscular', icon: Dumbbell },
      { value: 'manter_forma', label: 'Manter a forma', icon: Heart },
      { value: 'melhorar_saude', label: 'Melhorar saúde geral', icon: Sparkles },
    ],
  },
  {
    id: 2,
    question: 'Como você descreveria seus hábitos alimentares?',
    options: [
      { value: 'saudavel', label: 'Muito saudável', icon: Apple },
      { value: 'moderado', label: 'Moderadamente saudável', icon: Apple },
      { value: 'irregular', label: 'Irregular', icon: Apple },
      { value: 'precisa_melhorar', label: 'Precisa melhorar muito', icon: Apple },
    ],
  },
  {
    id: 3,
    question: 'Com que frequência você se exercita?',
    options: [
      { value: 'diario', label: 'Todos os dias', icon: Dumbbell },
      { value: '3_5_vezes', label: '3-5 vezes por semana', icon: Dumbbell },
      { value: '1_2_vezes', label: '1-2 vezes por semana', icon: Dumbbell },
      { value: 'raramente', label: 'Raramente ou nunca', icon: Dumbbell },
    ],
  },
  {
    id: 4,
    question: 'Quanto tempo você pode dedicar aos exercícios diariamente?',
    options: [
      { value: 'mais_60', label: 'Mais de 60 minutos', icon: Clock },
      { value: '30_60', label: '30-60 minutos', icon: Clock },
      { value: '15_30', label: '15-30 minutos', icon: Clock },
      { value: 'menos_15', label: 'Menos de 15 minutos', icon: Clock },
    ],
  },
  {
    id: 5,
    question: 'Qual é o seu maior desafio?',
    options: [
      { value: 'motivacao', label: 'Falta de motivação', icon: Zap },
      { value: 'tempo', label: 'Falta de tempo', icon: Clock },
      { value: 'conhecimento', label: 'Falta de conhecimento', icon: Sparkles },
      { value: 'consistencia', label: 'Manter a consistência', icon: Trophy },
    ],
  },
];

export default function Home() {
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<QuizAnswer[]>([]);
  const [showResults, setShowResults] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  useEffect(() => {
    const saved = localStorage.getItem('healthQuizProfile');
    if (saved) {
      const profile = JSON.parse(saved);
      setUserProfile(profile);
      if (profile.completedAt) {
        setAnswers(profile.answers);
        setShowResults(true);
      }
    }
  }, []);

  const handleAnswer = (question: string, answer: string) => {
    const newAnswers = [...answers, { question, answer }];
    setAnswers(newAnswers);

    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      const profile: UserProfile = {
        answers: newAnswers,
        completedAt: new Date().toISOString(),
      };
      localStorage.setItem('healthQuizProfile', JSON.stringify(profile));
      setUserProfile(profile);
      setShowResults(true);
    }
  };

  const resetQuiz = () => {
    setCurrentStep(0);
    setAnswers([]);
    setShowResults(false);
    localStorage.removeItem('healthQuizProfile');
    setUserProfile(null);
  };

  const getTips = () => {
    const tips = [];
    const answerValues = answers.map(a => a.answer);

    if (answerValues.includes('perder_peso')) {
      tips.push({
        title: 'Déficit Calórico Inteligente',
        description: 'Consuma 300-500 calorias a menos que seu gasto diário. Não exagere para não perder massa muscular.',
        icon: Target,
      });
    }

    if (answerValues.includes('precisa_melhorar') || answerValues.includes('irregular')) {
      tips.push({
        title: 'Comece com Pequenas Mudanças',
        description: 'Substitua refrigerantes por água, adicione mais vegetais às refeições e reduza alimentos processados.',
        icon: Apple,
      });
    }

    if (answerValues.includes('raramente') || answerValues.includes('menos_15')) {
      tips.push({
        title: 'Exercícios Curtos e Eficientes',
        description: 'Treinos HIIT de 15-20 minutos podem ser tão eficazes quanto 1 hora de exercício moderado.',
        icon: Dumbbell,
      });
    }

    if (answerValues.includes('motivacao') || answerValues.includes('consistencia')) {
      tips.push({
        title: 'Crie uma Rotina Sustentável',
        description: 'Estabeleça horários fixos, encontre um parceiro de treino e celebre pequenas vitórias.',
        icon: Trophy,
      });
    }

    if (answerValues.includes('tempo')) {
      tips.push({
        title: 'Otimize Seu Tempo',
        description: 'Prepare refeições no fim de semana e faça exercícios em casa. Cada minuto conta!',
        icon: Clock,
      });
    }

    if (tips.length < 3) {
      tips.push({
        title: 'Hidratação é Fundamental',
        description: 'Beba pelo menos 2 litros de água por dia. A água acelera o metabolismo e reduz a fome.',
        icon: Sparkles,
      });
      tips.push({
        title: 'Durma Bem',
        description: '7-9 horas de sono de qualidade são essenciais para recuperação muscular e controle hormonal.',
        icon: Heart,
      });
    }

    return tips;
  };

  if (showResults) {
    const tips = getTips();

    return (
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50">
        {/* Header */}
        <div className="bg-gradient-to-r from-emerald-500 to-orange-500 text-white py-8 px-4">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex justify-center mb-4">
              <Trophy className="w-16 h-16" />
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold mb-2">Parabéns! 🎉</h1>
            <p className="text-lg sm:text-xl opacity-90">Você completou o quiz de saúde</p>
          </div>
        </div>

        {/* Success Images Section */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 text-center">
              Visualize Seu Sucesso
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
              <img
                src="https://images.unsplash.com/photo-1571019614242-c5c5dee9f50b?w=600&h=400&fit=crop"
                alt="Pessoa saudável praticando exercícios"
                className="w-full h-48 sm:h-64 object-cover rounded-xl shadow-lg"
              />
              <img
                src="https://images.unsplash.com/photo-1490645935967-10de6ba17061?w=600&h=400&fit=crop"
                alt="Alimentação saudável"
                className="w-full h-48 sm:h-64 object-cover rounded-xl shadow-lg"
              />
            </div>
            <p className="text-center text-gray-600 text-sm sm:text-base">
              Essas imagens representam o futuro saudável que você está construindo! 💪
            </p>
          </div>

          {/* Personalized Tips */}
          <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8 mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <Sparkles className="w-8 h-8 text-orange-500" />
              Dicas Personalizadas Para Você
            </h2>
            <div className="space-y-4">
              {tips.map((tip, index) => {
                const Icon = tip.icon;
                return (
                  <div
                    key={index}
                    className="flex gap-4 p-4 bg-gradient-to-r from-emerald-50 to-orange-50 rounded-xl border-2 border-emerald-200 hover:border-orange-300 transition-all duration-300"
                  >
                    <div className="flex-shrink-0">
                      <div className="w-12 h-12 bg-gradient-to-br from-emerald-500 to-orange-500 rounded-full flex items-center justify-center">
                        <Icon className="w-6 h-6 text-white" />
                      </div>
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-gray-800 mb-1">{tip.title}</h3>
                      <p className="text-gray-600 text-sm sm:text-base">{tip.description}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Subscription CTA */}
          <div className="bg-gradient-to-br from-emerald-500 to-orange-500 rounded-2xl shadow-2xl p-6 sm:p-8 text-white mb-8">
            <div className="text-center mb-6">
              <h2 className="text-2xl sm:text-3xl font-bold mb-3">
                Transforme Sua Vida Hoje!
              </h2>
              <p className="text-lg sm:text-xl opacity-90 mb-2">
                Plano Completo de Emagrecimento
              </p>
              <div className="flex items-center justify-center gap-2 mb-4">
                <span className="text-4xl sm:text-5xl font-bold">R$ 39</span>
                <span className="text-xl opacity-80">/mês</span>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm sm:text-base">Plano alimentar personalizado</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm sm:text-base">Treinos adaptados ao seu nível</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm sm:text-base">Acompanhamento semanal</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm sm:text-base">Suporte via WhatsApp</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm sm:text-base">Receitas saudáveis exclusivas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm sm:text-base">Comunidade motivadora</span>
              </div>
            </div>

            <button className="w-full bg-white text-emerald-600 font-bold py-4 px-6 rounded-xl text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg flex items-center justify-center gap-2">
              Começar Agora
              <ArrowRight className="w-5 h-5" />
            </button>

            <p className="text-center text-sm opacity-80 mt-4">
              🔒 Pagamento seguro • Cancele quando quiser
            </p>
          </div>

          {/* Reset Button */}
          <div className="text-center">
            <button
              onClick={resetQuiz}
              className="text-gray-600 hover:text-gray-800 underline text-sm sm:text-base"
            >
              Refazer o quiz
            </button>
          </div>
        </div>
      </div>
    );
  }

  const currentQuestion = questions[currentStep];
  const progress = ((currentStep + 1) / questions.length) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-orange-50 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="bg-gradient-to-br from-emerald-500 to-orange-500 p-4 rounded-full">
              <Heart className="w-10 h-10 text-white" />
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-gray-800 mb-2">
            Quiz de Saúde
          </h1>
          <p className="text-gray-600 text-sm sm:text-base">
            Descubra o plano perfeito para seus objetivos
          </p>
        </div>

        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 mb-2">
            <span>Pergunta {currentStep + 1} de {questions.length}</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
            <div
              className="bg-gradient-to-r from-emerald-500 to-orange-500 h-full rounded-full transition-all duration-500 ease-out"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>

        {/* Question Card */}
        <div className="bg-white rounded-2xl shadow-xl p-6 sm:p-8">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-800 mb-6">
            {currentQuestion.question}
          </h2>

          <div className="space-y-3">
            {currentQuestion.options.map((option) => {
              const Icon = option.icon;
              return (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(currentQuestion.question, option.value)}
                  className="w-full flex items-center gap-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 hover:from-emerald-50 hover:to-orange-50 border-2 border-gray-200 hover:border-emerald-400 rounded-xl transition-all duration-300 transform hover:scale-105 hover:shadow-lg group"
                >
                  <div className="flex-shrink-0 w-12 h-12 bg-gradient-to-br from-emerald-500 to-orange-500 rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <span className="text-left font-medium text-gray-700 group-hover:text-gray-900 text-sm sm:text-base">
                    {option.label}
                  </span>
                  <ArrowRight className="w-5 h-5 text-gray-400 group-hover:text-emerald-500 ml-auto transition-colors duration-300" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Motivational Footer */}
        <div className="mt-8 text-center">
          <p className="text-gray-600 text-sm flex items-center justify-center gap-2">
            <Zap className="w-4 h-4 text-orange-500" />
            Você está a {questions.length - currentStep} {questions.length - currentStep === 1 ? 'passo' : 'passos'} do seu plano personalizado!
          </p>
        </div>
      </div>
    </div>
  );
}
