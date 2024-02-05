<div class="c-modal" onwheel="event.stopPropagation()">
  <div class="c-modal__wrapper u-oh">
    <div class="c-modal__cross u-cf u-z1">{!! display_svg('cross') !!}</div>
    <div class="c-modal__content u-nsb">
      <div class="c-modal__items--wrapper">
        <div class="c-modal__timeline front"></div>
        <div class="c-modal__timeline back"><span class="c-modal__bullet"></span><span class="c-modal__bullet"></span><span class="c-modal__bullet"></span></div>
        <div class="c-modal__items">
          @foreach ($data['items'] as $item)
          <div class="c-modal__item">
            <div class="c-modal__item--date observe"><span class="c-modal__bullet observe"></span>{!! $item['date'] !!}</div>
            <h3 class="c-modal__item--title observe">{!! $item['title'] !!}</h3>
            @foreach ($item['events'] as $event)
              @if (isset($event['text']))
              <div class="c-modal__item--text observe">
                <span class="c-modal__bullet observe"></span>
                <p class="observe">/{!! $event['text'] !!}</p>
              </div>
              @else
              <div class="c-modal__item--image observe">@include('elements/image', ['data' => $event['image']])</div>
              @endif
            @endforeach
          </div>
          @endforeach
        </div>
      </div>
      <div class="c-modal__bottom">
        <div class="c-modal__bottom--shape">@include('elements/image', ['data' => $data['shape']])</div>
        <div class="c-modal__bottom--content">
          <h3 class="c-modal__bottom--title">{!! $data['title_shape'] !!}</h3>
          <div class="c-modal__bottom--link">@include('elements/button', ['data' => $data['link']])</div>
        </div>
      </div>
    </div>
  </div>
</div>
