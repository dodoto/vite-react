import "css-doodle";
import { Box, Flex } from "@chakra-ui/react";

export const DoodleExampleList = () => {

  return (
    <Box h="100vh" overflowX="hidden">
      <css-doodle click-to-update>
        {
          `
            --rotate: @r(0 , 360)deg;
            @grid: 1x100 / 100vmax / #000;
            @place-cell: center;
            @size: calc(100% - @calc(@index() - 1) * 1%);
            transform: rotate(calc(@index() * var(--rotate)));
            border: 1px solid hsla(
              calc(calc(100 - @index()) * 2.55), 
              calc(@index() * 1%), 
              50%,
              calc(@index() / 100)
            );
          `
        }
      </css-doodle>
      <css-doodle>
        {
          `
            @grid: 8 / 100vmax / #0a0c27;
            @shape: whale;
            background: hsla(-@i(*4), 70%, 68%, @r.8);
            transform: scale(@r(.2, 1.5)) translate(@m2.@r(±50%));
            @random {
              @shape: bud 5;
            }
            @random {
              @shape: clover 5;
            }
            @random {
              @shape: hypocycloid 5;
            }
          `
        }
      </css-doodle>

      <css-doodle click-to-update>
        <style>
          @grid: 12 / 100vmax / #0a0c27;
          --hue: calc(180 + 1.5 * @x * @y);
          background: hsl(var(--hue), 50%, 70%);
          margin: -.5px;
          transition: @r(.5s) ease;
          clip-path: polygon(@p('0 0, 100% 0, 100% 100%',
          '0 0, 100% 0, 0 100%',
          '0 0, 100% 100%, 0 100%',
          '100% 0, 100% 100%, 0 100%'
          ));
        </style>
      </css-doodle>

      <Flex justify="center">
        <css-doodle click-to-update>
          <style>
            {
              `
              @grid: 1 / 50vmin 70vmin;
              border: 1vmin solid #000;
              background-size: 100% 100%;
              background-image: @svg(viewBox: 0 0 100 140;
    
                g {
                  fill: none;
    
                  path*200 {
                    stroke: @p(#f9f8eb, #76b39d, #05004e, #fd5f00);
                    stroke-width: @r1.5;
                    stroke-dasharray: @M2.@r(10, 60);
                    d: M 70 50 Q @Plot(r: 60; move: 20 80) @Plot(r: 125; move: 80 60);
                  }
                });
              `
            }
          </style>
        </css-doodle>
      </Flex>

      <css-doodle>
        <style>
          {
            `
              @grid: 1 / 100vw 100vh / #125cde;
              @content: @Svg(viewBox: -50 -50 100 100 padding -20;
        
                  circle*500 {
                  fill: hsl(@calc(120-90*@sin.n), 80%, 50%);
                  r: @sqrt(@n/60);
                  cx: @calc(@n*.618^4 * cos(2π*@n*.618));
                  cy: @calc(@n*.618^4 * sin(2π*@n*.618));
                });
              `
          }
        </style>
      </css-doodle>

      <css-doodle>
        <style>
          @grid: 20 / 100vmax / #0a0c27;
          @content: @unicode.r(0x2500, 0x257f);
          color: hsla(@r360, 70%, 70%, @r.9);
          font-size: 8vmin;
          font-family: sans-serif;
        </style>
      </css-doodle>
    </Box>
  );
}

