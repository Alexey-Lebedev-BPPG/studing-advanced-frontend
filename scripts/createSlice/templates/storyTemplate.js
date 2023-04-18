// шаблон создания файла сторибука
module.exports = (layer, componentName) => `
import { StoryFn, Meta } from '@storybook/react';

import { ${componentName} } from './${componentName}';

export default {
    title: '${layer}/${componentName}',
    component: ${componentName},
    argTypes: {
        backgroundColor: { control: 'color' },
    },
} as Meta<typeof ${componentName}>;

const Template: StoryFn<typeof ${componentName}> = (args) => <${componentName} {...args} />;

export const Normal = Template.bind({});
Normal.args = {
   
};`;
