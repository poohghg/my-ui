'use client';

import { Avatar, ToolTip } from 'ui';
import React from 'react';
import SwitchCase from 'ui/components/switchCase';

export const Client = () => {
  return (
    <>
      <ToolTip position={'bottom'} text={'I am a tooltip'}>
        <Avatar
          url={
            'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=687&q=80'
          }
        />
      </ToolTip>
      <SwitchCase
        value={'a'}
        caseBy={{
          1: () => <div>This is 1</div>,
          2: () => <div>This is 2</div>,
          a: () => <div>This is A</div>,
          b: () => <div>This is B</div>,
        }}
        defaultComponent={() => <div>This is Default</div>}
      />
    </>
  );
};
