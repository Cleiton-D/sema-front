import { Story, Meta } from '@storybook/react';
import { ArrowRight, UserPlus } from '@styled-icons/feather';
import { UserLeft } from 'assets/images/user-left.svg';

import Card, { CardProps } from '.';

export default {
  title: 'Card',
  component: Card,
  argsTypes: {
    children: {
      type: 'string'
    },
    description: {
      type: 'string'
    },
    icon: {
      type: ''
    },
    arrowIcon: {
      type: ''
    }
  }
} as Meta;

export const Default: Story<CardProps> = (args) => <Card {...args} />;

Default.args = {
  children: '150',
  description: 'Alunos Ativos'
};

export const Enrollments: Story<CardProps> = (args) => <Card {...args} />;

Enrollments.args = {
  description: 'Matrículas',
  icon: <UserPlus />
};

export const Transfers: Story<CardProps> = (args) => <Card {...args} />;

Transfers.args = {
  description: 'Transferência',
  icon: <UserLeft />
};
