import Helper from '@ember/component/helper';
import { inject as service } from '@ember/service';

export default class OpenModalHelper extends Helper {
  @service modals;

  modal = null;

  compute([modalComponent, data, options], { close }) {
    this.showModal(modalComponent, data, options, close);
  }

  async showModal(modalComponent, data, options, close) {
    this.modal = this.modals.open(modalComponent, data, options);

    let success = await this.modal;

    this.modal = null;

    if (close) {
      close(success);
    }
  }

  hideModal() {
    this.modal?.close();
  }

  willDestroy() {
    this.hideModal();
    super.willDestroy(...arguments);
  }
}
