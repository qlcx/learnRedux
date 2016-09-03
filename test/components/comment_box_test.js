import { renderComponent, expect } from '../test_helper';
import CommemtBox from '../../src/components/comment_box';

describe('CommentBox', () => {
  it('has the correct class', () => {
    const component = renderComponent(CommemtBox);
    expect(component).to.have.class('comment-box');
  })

  it('has a text area', () => {
    const component = renderComponent(CommemtBox);
    expect(component.find('textarea')).to.exist;
  });

  it('has a button', () => {
    const component = renderComponent(CommemtBox);
    expect(component.find('button')).to.exist;
  });
});