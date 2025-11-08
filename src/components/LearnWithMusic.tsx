import { useState, useEffect } from 'react';
import { ArrowLeft, Music, Trophy, RotateCcw, Volume2, VolumeX, Check, X } from 'lucide-react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { medicalDictionary } from '../utils/medicalDictionary';
import { playSuccessSound, playErrorSound } from '../utils/audioPlayer';

interface LearnWithMusicProps {
  onBack: () => void;
}

interface GameCard {
  id: string;
  text: string;
  type: 'term' | 'definition';
  matched: boolean;
  termKey: string;
}

export function LearnWithMusic({ onBack }: LearnWithMusicProps) {
  const [score, setScore] = useState(0);
  const [attempts, setAttempts] = useState(0);
  const [selectedCard, setSelectedCard] = useState<GameCard | null>(null);
  const [cards, setCards] = useState<GameCard[]>([]);
  const [isComplete, setIsComplete] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [correctPairs, setCorrectPairs] = useState(0);
  const [feedback, setFeedback] = useState<{ show: boolean; correct: boolean; text: string }>({
    show: false,
    correct: false,
    text: ''
  });

  // Initialize game with random terms
  useEffect(() => {
    startNewGame();
  }, []);

  const startNewGame = () => {
    // Get 6 random terms from dictionary
    const allTerms = Object.entries(medicalDictionary);
    const shuffled = allTerms.sort(() => Math.random() - 0.5);
    const selectedTerms = shuffled.slice(0, 6);

    // Create cards for terms and definitions
    const termCards: GameCard[] = selectedTerms.map(([term, data], index) => ({
      id: `term-${index}`,
      text: term,
      type: 'term',
      matched: false,
      termKey: term
    }));

    const definitionCards: GameCard[] = selectedTerms.map(([term, data], index) => ({
      id: `def-${index}`,
      text: data.meaning,
      type: 'definition',
      matched: false,
      termKey: term
    }));

    // Shuffle all cards together
    const allCards = [...termCards, ...definitionCards].sort(() => Math.random() - 0.5);
    
    setCards(allCards);
    setScore(0);
    setAttempts(0);
    setSelectedCard(null);
    setIsComplete(false);
    setCorrectPairs(0);
    setFeedback({ show: false, correct: false, text: '' });
  };

  const handleCardClick = (card: GameCard) => {
    if (card.matched || feedback.show) return;

    // First card selection
    if (!selectedCard) {
      setSelectedCard(card);
      return;
    }

    // Same card clicked twice
    if (selectedCard.id === card.id) {
      setSelectedCard(null);
      return;
    }

    // Same type selected (both terms or both definitions)
    if (selectedCard.type === card.type) {
      setSelectedCard(card);
      return;
    }

    // Check if it's a match
    setAttempts(prev => prev + 1);

    if (selectedCard.termKey === card.termKey) {
      // Correct match!
      handleCorrectMatch(selectedCard, card);
    } else {
      // Wrong match
      handleIncorrectMatch();
    }
  };

  const handleCorrectMatch = (card1: GameCard, card2: GameCard) => {
    if (soundEnabled) {
      playSuccessSound();
    }

    // Update cards to show matched
    setCards(prev => prev.map(c => 
      c.id === card1.id || c.id === card2.id 
        ? { ...c, matched: true }
        : c
    ));

    setScore(prev => prev + 10);
    setCorrectPairs(prev => prev + 1);
    setSelectedCard(null);

    // Show success feedback
    setFeedback({
      show: true,
      correct: true,
      text: 'Perfect match! 🎵'
    });

    setTimeout(() => {
      setFeedback({ show: false, correct: false, text: '' });
      
      // Check if game is complete
      if (correctPairs + 1 === 6) {
        setIsComplete(true);
      }
    }, 1000);
  };

  const handleIncorrectMatch = () => {
    if (soundEnabled) {
      playErrorSound();
    }

    setFeedback({
      show: true,
      correct: false,
      text: 'Not quite, try again!'
    });

    setTimeout(() => {
      setFeedback({ show: false, correct: false, text: '' });
      setSelectedCard(null);
    }, 800);
  };

  const accuracy = attempts > 0 ? Math.round((correctPairs / attempts) * 100) : 0;

  return (
    <div className="min-h-screen bg-[#F5F7FA] pb-6">
      {/* Header */}
      <div className="bg-gradient-to-r from-[#0066CC] to-[#004C99] text-white p-6 pb-8">
        <div className="flex items-center gap-3 mb-4">
          <button onClick={onBack} className="p-2 hover:bg-white/10 rounded-full transition-all">
            <ArrowLeft className="w-6 h-6" />
          </button>
          <div className="flex-1">
            <h2 className="text-white flex items-center gap-2">
              <Music className="w-6 h-6" />
              Learn with Music
            </h2>
            <p className="text-white/80">Match terms with definitions</p>
          </div>
          <button
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="p-2 hover:bg-white/10 rounded-full transition-all"
          >
            {soundEnabled ? (
              <Volume2 className="w-6 h-6" />
            ) : (
              <VolumeX className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Score Display */}
        <div className="grid grid-cols-3 gap-3">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <p className="text-white/80 mb-1">Score</p>
            <p className="text-white">{score}</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <p className="text-white/80 mb-1">Matched</p>
            <p className="text-white">{correctPairs}/6</p>
          </div>
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-3">
            <p className="text-white/80 mb-1">Accuracy</p>
            <p className="text-white">{accuracy}%</p>
          </div>
        </div>
      </div>

      <div className="px-6 -mt-4">
        {/* Feedback Banner */}
        {feedback.show && (
          <Card className={`p-4 mb-4 transition-all ${
            feedback.correct 
              ? 'bg-green-50 border-green-200' 
              : 'bg-orange-50 border-orange-200'
          }`}>
            <div className="flex items-center gap-3">
              {feedback.correct ? (
                <Check className="w-6 h-6 text-green-600" />
              ) : (
                <X className="w-6 h-6 text-orange-600" />
              )}
              <p className={feedback.correct ? 'text-green-700' : 'text-orange-700'}>
                {feedback.text}
              </p>
            </div>
          </Card>
        )}

        {/* Instructions */}
        {!isComplete && correctPairs === 0 && (
          <Card className="p-4 mb-4 bg-[#F0F7FF] border border-[#0066CC]/20">
            <p className="text-[#0066CC]">
              Tap a term, then tap its matching definition. Hear a jingle when you get it right!
            </p>
          </Card>
        )}

        {/* Completion Screen */}
        {isComplete && (
          <Card className="p-6 mb-4 bg-white shadow-lg border-0 text-center">
            <Trophy className="w-16 h-16 text-yellow-500 mx-auto mb-4" />
            <h3 className="text-[#333] mb-2">Congratulations!</h3>
            <p className="text-[#666] mb-4">
              You matched all {correctPairs} pairs with {accuracy}% accuracy!
            </p>
            <Button
              onClick={startNewGame}
              className="w-full bg-[#0066CC] hover:bg-[#0052A3] text-white h-12"
            >
              <RotateCcw className="w-5 h-5 mr-2" />
              Play Again
            </Button>
          </Card>
        )}

        {/* Game Cards */}
        {!isComplete && (
          <div className="grid grid-cols-2 gap-3">
            {cards.map((card) => (
              <Card
                key={card.id}
                onClick={() => handleCardClick(card)}
                className={`
                  p-4 min-h-[120px] flex items-center justify-center text-center
                  transition-all cursor-pointer
                  ${card.matched 
                    ? 'bg-green-50 border-green-300 opacity-60' 
                    : 'bg-white border-[#E0E0E0] hover:shadow-lg hover:border-[#0066CC]'
                  }
                  ${selectedCard?.id === card.id && !card.matched
                    ? 'bg-[#0066CC] text-white border-[#0066CC] scale-105'
                    : ''
                  }
                `}
              >
                <div>
                  {card.type === 'term' && (
                    <p className="text-xs text-[#999] mb-1">TERM</p>
                  )}
                  {card.type === 'definition' && (
                    <p className="text-xs text-[#999] mb-1">DEFINITION</p>
                  )}
                  <p className={`
                    ${card.type === 'term' ? 'font-semibold text-lg' : 'text-sm'}
                    ${selectedCard?.id === card.id && !card.matched ? 'text-white' : 'text-[#333]'}
                  `}>
                    {card.text}
                  </p>
                  {card.matched && (
                    <Check className="w-5 h-5 text-green-600 mx-auto mt-2" />
                  )}
                </div>
              </Card>
            ))}
          </div>
        )}

        {/* Reset Button */}
        {!isComplete && correctPairs > 0 && (
          <Button
            onClick={startNewGame}
            variant="outline"
            className="w-full mt-4 h-12 border-2 border-[#0066CC] text-[#0066CC] hover:bg-[#0066CC]/5"
          >
            <RotateCcw className="w-5 h-5 mr-2" />
            Start New Game
          </Button>
        )}

        {/* Tips Card */}
        <Card className="p-4 mt-4 bg-white border-0 shadow-sm">
          <p className="text-[#333] mb-2">Game Tips:</p>
          <ul className="text-[#666] space-y-1 list-disc list-inside">
            <li>Blue cards are your selected choices</li>
            <li>Green cards are matched pairs</li>
            <li>Listen for the jingle when you're correct!</li>
            <li>Try to get 100% accuracy</li>
          </ul>
        </Card>
      </div>
    </div>
  );
}
