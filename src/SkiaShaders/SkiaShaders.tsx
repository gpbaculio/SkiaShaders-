import React from 'react';
import {
  Canvas,
  Skia,
  Shader,
  Fill,
  vec,
  useTouchHandler,
  useValue,
  useComputedValue,
  useClockValue,
} from '@shopify/react-native-skia';
import {useWindowDimensions} from 'react-native';

const source = Skia.RuntimeEffect.Make(`
uniform float4 colors[4];
uniform float2 center;
uniform float2 pointer;
uniform float clock;

const float4 black = vec4(0,0,0,1);
struct Paint {
  float4 color;
  bool stroke;
  float strokeWidth;
};

float sdCircle(vec2 p, float radius) {
  return length(p) - radius;
}


float sdLine(vec2 p, vec2 a, vec2 b) { 
  vec2 pa = p - a;
  vec2 ba = b - a;
  float h = saturate(dot(pa, ba) / dot(ba, ba)); 
  return length(pa-ba*h);
}

float4 draw(float4 color, float d, Paint paint) { 
  bool isFill = paint.stroke == false  && d < 0;
  bool isStroke = paint.stroke == true  && abs(d) <= paint.strokeWidth/2;
  if(isFill || isStroke) { 
    return paint.color;
  }
  return color;
}


float4 drawCircle(float4 color, float2 pos, float radius, Paint paint) {
  float d = sdCircle(pos, radius);
  return draw(color, d, paint);
}


float4 drawLine(float4 color, float2 pos, float2 a, float2 b, Paint paint) {
  float d = sdLine(pos, a, b);
  return draw(color, d, paint);
}

vec4 main(vec2 xy) {
  float strokeWidth = 20;
  float radius = center.x - strokeWidth/2; 
  float4 color = colors[1];
  float d = sdLine(xy, center, pointer);
  float offset = clock * 0.03;
  float i = mod(floor((d + offset)/strokeWidth), 4);
  if(i == 0) {
    color = colors[0];
  } else if(i == 1) { 
    color = colors[1];
  } else if(i == 2) { 
    color = colors[2];
  } else if(i == 3) { 
    color = colors[3];
  }
  return color;
}`)!;

const colors = ['#dafb61', '#61DAFB', '#fb61da', '#61fbcf'].map(c =>
  Skia.Color(c),
);

const SDF = () => {
  const {width, height} = useWindowDimensions();
  const clock = useClockValue();
  const center = vec(width / 2, height / 2);
  const pointer = useValue(vec(0, 0));
  const onTouch = useTouchHandler({
    onActive: e => {
      pointer.current = e;
    },
  });

  const uniforms = useComputedValue(
    () => ({
      colors,
      center,
      pointer: pointer.current,
      clock: clock.current,
    }),
    [pointer, clock],
  );

  return (
    <Canvas style={{flex: 1}} onTouch={onTouch}>
      <Fill>
        <Shader source={source} uniforms={uniforms} />
      </Fill>
    </Canvas>
  );
};

export default SDF;
