import { Children, useState, cloneElement, useMemo } from 'react';
import { Variants, Variant } from 'framer-motion';
import { FormHandles } from '@unform/core';

import Button from 'components/Button';

import * as S from './styles';

type StepFormProps = {
  items: React.ReactElement[];
  finishButtonText?: string;
  onFinish?: () => void;
};

const FormStep = ({
  items,
  finishButtonText = 'Concluir',
  onFinish
}: StepFormProps) => {
  const [index, setIndex] = useState(0);
  const [refs, setRefs] = useState<FormHandles[]>([]);

  const withRefItems = useMemo(
    () =>
      Children.map(items, (item: any) => {
        const setRef = (value: any) => {
          if (item.ref) item.ref.current = value;

          setRefs((current) => [...current, value]);
        };

        const clonedElement = cloneElement(item, {
          ...item.props,
          ref: setRef
        });

        return clonedElement;
      }),
    [items]
  );

  const handleNext = () => {
    const ref = refs[index];
    ref?.submitForm();

    if (index === items.length - 1) {
      onFinish && onFinish();
      return;
    }

    setIndex((current) => {
      const next = current + 1;
      if (next >= items.length) return current;

      return next;
    });
  };

  const handlePrev = () => {
    setIndex((current) => {
      const next = current - 1;
      if (next < 0) return current;

      return next;
    });
  };

  const commonHideValues: Variant = {
    opacity: 0,
    scale: 0.99,
    position: 'absolute',
    transitionEnd: {
      display: 'none'
    }
  };

  const variants: Variants = {
    hidden: {
      ...commonHideValues,
      x: 0
    },
    outLeft: {
      ...commonHideValues,
      x: -150
    },
    outRight: {
      ...commonHideValues,
      x: 150
    },
    active: {
      opacity: 1,
      x: 0,
      scale: 1,
      position: 'static',
      boxShadow: '0px 0px 2px #BFC1C2',
      display: 'block'
    }
  };

  const defineAnimation = (itemIndex: number) => {
    if (itemIndex === index) return 'active';

    if (itemIndex < index) return 'outLeft';
    if (itemIndex > index) return 'outRight';

    return 'hidden';
  };

  return (
    <S.Wrapper>
      <S.ItemsContainer>
        {withRefItems.map((item, itemIndex) => (
          <S.Item
            initial={defineAnimation(itemIndex)}
            variants={variants}
            animate={defineAnimation(itemIndex)}
            transition={{ ease: 'backOut', duration: 0.5 }}
            key={String(itemIndex)}
          >
            {item}
          </S.Item>
        ))}
      </S.ItemsContainer>

      <S.SectionButtons>
        {index > 0 && (
          <Button styleType="outlined" onClick={handlePrev}>
            Anterior
          </Button>
        )}

        <Button styleType="rounded" onClick={handleNext}>
          {index === items.length - 1 ? finishButtonText : 'Próximo'}
        </Button>
      </S.SectionButtons>
    </S.Wrapper>
  );
};

export default FormStep;
