import { Grid, GridItem } from "@chakra-ui/react";

const FiftyData = [
  { hiragana: 'あ', katakana : 'ア', pronunciation: 'a' },　
  { hiragana: 'い', katakana : 'イ', pronunciation: 'i' },　
  { hiragana: 'う', katakana : 'ウ', pronunciation: 'u' },　
  { hiragana: 'え', katakana : 'エ', pronunciation: 'e' }, 
  { hiragana: 'お', katakana : 'オ', pronunciation: 'o' }, 
  { hiragana: 'か', katakana : 'カ', pronunciation: 'ka' }, 
  { hiragana: 'き', katakana : 'キ', pronunciation: 'ki' }, 
  { hiragana: 'く', katakana : 'ク', pronunciation: 'ku' }, 
  { hiragana: 'け', katakana : 'ケ', pronunciation: 'ke' }, 
  { hiragana: 'こ', katakana : 'コ', pronunciation: 'ko' }, 
  
  { hiragana: 'さ', katakana : 'サ', pronunciation: 'sa' }, 
  { hiragana: 'し', katakana : 'シ', pronunciation: 'shi' }, 
  { hiragana: 'す', katakana : 'ス', pronunciation: 'su' }, 
  { hiragana: 'せ', katakana : 'セ', pronunciation: 'se' }, 
  { hiragana: 'そ', katakana : 'ソ', pronunciation: 'so' }, 
  
  { hiragana: 'た', katakana : 'タ', pronunciation: 'ta' }, 
  { hiragana: 'ち', katakana : 'チ', pronunciation: 'chi' }, 
  { hiragana: 'つ', katakana : 'ツ', pronunciation: 'tsu' }, 
  { hiragana: 'て', katakana : 'テ', pronunciation: 'te' }, 
  { hiragana: 'と', katakana : 'ト', pronunciation: 'to' }, 
  
  { hiragana: 'な', katakana : 'ナ', pronunciation: 'na' }, 
  { hiragana: 'に', katakana : 'ニ', pronunciation: 'ni' }, 
  { hiragana: 'ぬ', katakana : 'ヌ', pronunciation: 'nu' }, 
  { hiragana: 'ね', katakana : 'ネ', pronunciation: 'ne' }, 
  { hiragana: 'の', katakana : 'ノ', pronunciation: 'no' }, 
  
  { hiragana: 'は', katakana : 'ハ', pronunciation: 'ha' }, 
  { hiragana: 'ひ', katakana : 'ヒ', pronunciation: 'hi' }, 
  { hiragana: 'ふ', katakana : 'フ', pronunciation: 'hu' }, 
  { hiragana: 'へ', katakana : 'ヘ', pronunciation: 'he' }, 
  { hiragana: 'ほ', katakana : 'ホ', pronunciation: 'ho' },
  
  { hiragana: 'ま', katakana : 'マ', pronunciation: 'ma' }, 
  { hiragana: 'み', katakana : 'ミ', pronunciation: 'mi' }, 
  { hiragana: 'む', katakana : 'ム', pronunciation: 'mu' }, 
  { hiragana: 'め', katakana : 'メ', pronunciation: 'me' }, 
  { hiragana: 'も', katakana : 'モ', pronunciation: 'mo' },
  
  { hiragana: 'や', katakana : 'ヤ', pronunciation: 'ya' }, 
  { hiragana: 'ゆ', katakana : 'ユ', pronunciation: 'yu' }, 
  { hiragana: 'よ', katakana : 'ヨ', pronunciation: 'yo' },
  
  { hiragana: 'ら', katakana : 'ラ', pronunciation: 'ra' }, 
  { hiragana: 'り', katakana : 'リ', pronunciation: 'ri' }, 
  { hiragana: 'る', katakana : 'ル', pronunciation: 'ru' }, 
  { hiragana: 'れ', katakana : 'レ', pronunciation: 're' }, 
  { hiragana: 'ろ', katakana : 'ロ', pronunciation: 'ro' },
  
  { hiragana: 'わ', katakana : 'ワ', pronunciation: 'wa' }, 
  { hiragana: 'を', katakana : 'ヲ', pronunciation: 'wo' }, 
  
  { hiragana: 'ん', katakana : 'ン', pronunciation: 'n' },
];

const TwentyFiveData = [
  { hiragana: 'が', katakana : 'ガ', pronunciation: 'ga' },
  { hiragana: 'ぎ', katakana : 'ギ', pronunciation: 'gi' },
  { hiragana: 'ぐ', katakana : 'グ', pronunciation: 'gu' },
  { hiragana: 'げ', katakana : 'ゲ', pronunciation: 'ge' },
  { hiragana: 'ご', katakana : 'ゴ', pronunciation: 'go' },

  { hiragana: 'ざ', katakana : 'ザ', pronunciation: 'za' },
  { hiragana: 'じ', katakana : 'ジ', pronunciation: 'ji' },
  { hiragana: 'ず', katakana : 'ズ', pronunciation: 'zu' },
  { hiragana: 'ぜ', katakana : 'ゼ', pronunciation: 'ze' },
  { hiragana: 'ぞ', katakana : 'ゾ', pronunciation: 'zo' },

  { hiragana: 'だ', katakana : 'ダ', pronunciation: 'da' },
  { hiragana: 'ぢ', katakana : 'ジ', pronunciation: 'ji' },
  { hiragana: 'づ', katakana : 'ヅ', pronunciation: 'du' },
  { hiragana: 'で', katakana : 'デ', pronunciation: 'de' },
  { hiragana: 'ど', katakana : 'ド', pronunciation: 'do' },

  { hiragana: 'ば', katakana : 'バ', pronunciation: 'ba' },
  { hiragana: 'び', katakana : 'ビ', pronunciation: 'bi' },
  { hiragana: 'ぶ', katakana : 'ブ', pronunciation: 'bu' },
  { hiragana: 'べ', katakana : 'ベ', pronunciation: 'be' },
  { hiragana: 'ぼ', katakana : 'ボ', pronunciation: 'bo' },

  { hiragana: 'ぱ', katakana : 'パ', pronunciation: 'pa' },
  { hiragana: 'ぴ', katakana : 'ピ', pronunciation: 'pi' },
  { hiragana: 'ぷ', katakana : 'プ', pronunciation: 'pu' },
  { hiragana: 'ぺ', katakana : 'ペ', pronunciation: 'pe' },
  { hiragana: 'ぽ', katakana : 'ポ', pronunciation: 'po' },
];

const FifteenData = [
  { hiragana: 'きゃ', katakana : 'キャ', pronunciation: 'kya' },
  { hiragana: 'しゃ', katakana : 'シャ', pronunciation: 'sha' },
  { hiragana: 'ちゃ', katakana : 'チャ', pronunciation: 'cha' },
  { hiragana: 'にゃ', katakana : 'ニャ', pronunciation: 'nya' },
  { hiragana: 'ひゃ', katakana : 'ヒャ', pronunciation: 'hya' },

  { hiragana: 'きゅ', katakana : 'キュ', pronunciation: 'kyu' },
  { hiragana: 'しゅ', katakana : 'シュ', pronunciation: 'shu' },
  { hiragana: 'ちゅ', katakana : 'チュ', pronunciation: 'chu' },
  { hiragana: 'にゅ', katakana : 'ニュ', pronunciation: 'nyu' },
  { hiragana: 'ひゅ', katakana : 'ヒュ', pronunciation: 'hyu' },

  { hiragana: 'きょ', katakana : 'キョ', pronunciation: 'kyo' },
  { hiragana: 'しょ', katakana : 'ショ', pronunciation: 'sho' },
  { hiragana: 'ちょ', katakana : 'チョ', pronunciation: 'cho' },
  { hiragana: 'にょ', katakana : 'ニョ', pronunciation: 'nyo' },
  { hiragana: 'ひょ', katakana : 'ヒョ', pronunciation: 'hyo' },
];

const COUNT = 30;

const DAY_LIST = new Array(COUNT).fill(1).map((item: number, index) => item + index);

export const Calendar = () => {
  return (
    <Grid gap="1.5" templateColumns={"repeat(7, 1fr)"}>
      {
        DAY_LIST.map((item) => (
          <GridItem key={item} bg="blue.500" color="white">
            {item}
          </GridItem>
        ))
      }
    </Grid>
  );
};