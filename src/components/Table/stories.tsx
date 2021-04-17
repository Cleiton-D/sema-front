import { Story, Meta } from '@storybook/react';

import TableColumn from 'components/TableColumn';
import { useRef, useState } from 'react';
import Table from '.';

export default {
  title: 'Table',
  component: Table,
  argTypes: {}
} as Meta;

type TableItemType = {
  id: string;
  nome: string;
  idade: string;
  sobrenome: string;
};

const data = [
  {
    id: '1',
    nome: 'Cleiton',
    idade: '21',
    sobrenome: 'Kiper'
  },
  {
    id: '2',
    nome: 'Tiago',
    idade: '21',
    sobrenome: 'Persch'
  }
];

export const Default: Story = () => {
  return (
    <Table<TableItemType> items={data} keyExtractor={(value) => value.id}>
      <TableColumn
        tableKey="nome"
        label="Nome do cliente"
        fixed
        render={(value) => <div style={{ color: 'red' }}>{value}</div>}
      />
      <TableColumn tableKey="sobrenome" label="sobrenome do cliente" fixed />
      <TableColumn tableKey="idade" label="idade do cliente" />
    </Table>
  );
};

type MinimalTableData = {
  id: string;
  subject: string;
  first: string;
  second: string;
  recover: string;
  exame: string;
  final: string;
};

const minimalData: MinimalTableData[] = [
  {
    id: '1',
    subject: 'Lingua portuguesa',
    first: '7,5',
    second: '8,0',
    recover: '-',
    exame: '-',
    final: '7,75'
  },
  {
    id: '2',
    subject: 'Matemática',
    first: '7,5',
    second: '8,0',
    recover: '-',
    exame: '-',
    final: '7,75'
  },
  {
    id: '3',
    subject: 'História',
    first: '7,5',
    second: '8,0',
    recover: '-',
    exame: '-',
    final: '7,75'
  },
  {
    id: '4',
    subject: 'Geografia',
    first: '7,5',
    second: '8,0',
    recover: '-',
    exame: '-',
    final: '7,75'
  },
  {
    id: '5',
    subject: 'Inglês',
    first: '7,5',
    second: '8,0',
    recover: '-',
    exame: '-',
    final: '7,75'
  }
];

export const Minimal: Story = () => {
  return (
    <Table<MinimalTableData>
      items={minimalData}
      keyExtractor={(value) => value.id}
      minimal
    >
      <TableColumn tableKey="subject" label="Matéria" />
      <TableColumn tableKey="first" label="1º Bimestre" contentAlign="center" />
      <TableColumn
        tableKey="second"
        label="2º Bimestre"
        contentAlign="center"
      />
      <TableColumn
        tableKey="recover"
        label="Recuperação"
        contentAlign="center"
      />
      <TableColumn tableKey="exame" label="Exame" contentAlign="center" />
      <TableColumn tableKey="final" label="Média final" contentAlign="center" />
    </Table>
  );
};
